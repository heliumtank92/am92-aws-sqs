import {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
  ChangeMessageVisibilityCommand
} from '@aws-sdk/client-sqs'
import { CronJob } from 'cron'

import getSendOptions, { DEFAULT_SEND_OPTIONS } from './helpers/getSendOptions.mjs'
import getReceiveOptions from './helpers/getReceiveOptions.mjs'
import SqsError from './SqsError.mjs'

import CONFIG, { SERVICE } from './CONFIG.mjs'
import DEFAULT_HANDLERS from './helpers/DEFAULT_HANDLERS.mjs'

export default class SqsSdk {
  constructor (config = CONFIG, handlers = DEFAULT_HANDLERS) {
    this.config = { ...CONFIG, ...config }
    const { CONNECTION_CONFIG } = this.config

    this.client = new SQSClient(CONNECTION_CONFIG)
    this.handlers = { ...DEFAULT_HANDLERS, ...handlers }

    this.send = this.send.bind(this)
    this.startProcessing = this.startProcessing.bind(this)
  }

  async send (messageBody = '', options = DEFAULT_SEND_OPTIONS) {
    const sendOptions = getSendOptions(options)
    const sendProps = { MessageBody: messageBody, ...sendOptions }
    const data = await this.#sendMessage(sendProps)
    return data
  }

  startProcessing () {
    const cronJob = this.#createCronJob()
    return cronJob
  }

  async #sendMessage (attrs = {}) {
    try {
      const { client, config } = this

      const params = { ...attrs, QueueUrl: config.QUEUE_URL }
      const command = new SendMessageCommand(params)
      const response = await client.send(command)

      const { $metadata, ...data } = response
      return data
    } catch (error) {
      throw new SqsError(error)
    }
  }

  async #receiveMessages (attrs = {}) {
    try {
      const { client, config } = this
      const receiveOptions = getReceiveOptions(config.RECEIVE_OPTIONS)

      const params = { QueueUrl: config.QUEUE_URL, ...receiveOptions }
      const command = new ReceiveMessageCommand(params)
      const response = await client.send(command)

      const { Messages } = response
      return Messages
    } catch (error) {
      throw new SqsError(error)
    }
  }

  async #deleteMessage (attrs = {}) {
    try {
      const { client, config } = this
      const params = { ...attrs, QueueUrl: config.QUEUE_URL }
      const command = new DeleteMessageCommand(params)
      await client.send(command)
    } catch (error) {
      throw new SqsError(error)
    }
  }

  async #changeMessageVisibility (attrs = {}) {
    try {
      const { client, config } = this
      const params = { ...attrs, QueueUrl: config.QUEUE_URL }
      const command = new ChangeMessageVisibilityCommand(params)
      await client.send(command)
    } catch (error) {
      throw new SqsError(error)
    }
  }

  #createCronJob () {
    const { POLL_CRON_TIME, POLL_CRON_TIMEZONE } = this.config
    const cronOptions = {
      cronTime: POLL_CRON_TIME,
      timezone: POLL_CRON_TIMEZONE,
      start: true,
      onTick: this.#onTick,
      context: true,
      runOnInit: false
    }

    const cronJob = new CronJob(cronOptions)
    return cronJob
  }

  async #onTick () {
    try {
      const Messages = await this.#receiveMessages()
      await this.#processMessages(Messages)
    } catch (error) {
      console.error(`[${SERVICE} AwsSqs] Error Receiving Messages:`, error)
    }
  }

  async #processMessages (Messages = []) {
    const promises = Messages.map(this.#processMessage)
    await Promise.allSettled(promises)
  }

  async #processMessage (Message = {}) {
    const { processMessage } = this.handlers

    try {
      await processMessage(Message)
      await this.#deleteMessage(Message).catch(error => {
        console.error(`[${SERVICE} AwsSqs] Error Deleting Message:`, { Message, error })
      })
    } catch (error) {
      this.#handleProcessMessageFailure(error, Message)
    }
  }

  async #handleProcessMessageFailure (error, Message = {}) {
    const { shouldRetry, onRetryReject } = this.handlers

    const { retry = false, visibilityTimeout = 0 } = await shouldRetry(error, Message)
    if (retry) {
      const changeMessageVisibilityProps = { ...Message, VisibilityTimeout: visibilityTimeout }
      await this.#changeMessageVisibility(changeMessageVisibilityProps)
    } else {
      await onRetryReject(Message).catch(() => undefined)
      await this.#deleteMessage(Message).catch(error => {
        console.error(`[${SERVICE} AwsSqs] Error Deleting Message:`, { Message, error })
      })
    }
  }
}
