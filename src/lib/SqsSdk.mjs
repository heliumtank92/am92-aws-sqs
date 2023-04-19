import AwsSqs from './AwsSqs.mjs'
import { CronJob } from 'cron'

import CONFIG, { SERVICE } from '../CONFIG.mjs'
import DEFAULT_HANDLERS from '../helpers/DEFAULT_HANDLERS.mjs'

export default class SqsSdk extends AwsSqs {
  constructor (config = CONFIG, handlers = DEFAULT_HANDLERS) {
    super(config)

    this.handlers = { ...DEFAULT_HANDLERS, ...handlers }

    // Method Hard-binding
    this.send = this.send.bind(this)
    this.startProcessing = this.startProcessing.bind(this)
  }

  async send (messageBody = '', options) {
    const sendProps = { MessageBody: messageBody, ...options }
    const data = await this._sendMessage(sendProps)
    return data
  }

  startProcessing () {
    const cronJob = this._createCronJob()
    return cronJob
  }

  _createCronJob = () => {
    const { POLL_CRON_TIME, POLL_CRON_TIMEZONE } = this.config
    const cronOptions = {
      cronTime: POLL_CRON_TIME,
      timezone: POLL_CRON_TIMEZONE,
      start: true,
      onTick: this._onTick,
      context: true,
      runOnInit: false
    }

    const cronJob = new CronJob(cronOptions)
    return cronJob
  }

  _onTick = async () => {
    try {
      const Messages = await this._receiveMessages()
      await this._processMessages(Messages)
    } catch (error) {
      console.error(`[${SERVICE} AwsSqs] Error Receiving Messages:`, error)
    }
  }

  _processMessages = async (Messages = []) => {
    const promises = Messages.map(this._processMessage)
    await Promise.allSettled(promises)
  }

  _processMessage = async (Message = {}) => {
    const { processMessage } = this.handlers

    try {
      await processMessage(Message)
      await this._deleteMessage(Message).catch(error => {
        console.error(`[${SERVICE} AwsSqs] Error Deleting Message:`, { Message, error })
      })
    } catch (error) {
      this._handleProcessMessageFailure(error, Message)
    }
  }

  _handleProcessMessageFailure = async (error, Message = {}) => {
    const { shouldRetry, onRetryReject } = this.handlers

    const { retry = false, visibilityTimeout = 0 } = await shouldRetry(error, Message).catch(error => {
      console.error(`[${SERVICE} AwsSqs] Error in  shouldRetry:`, { Message, error })
      return {}
    })

    if (retry) {
      const changeMessageVisibilityProps = { ...Message, VisibilityTimeout: visibilityTimeout }
      await this._changeMessageVisibility(changeMessageVisibilityProps)
    } else {
      await onRetryReject(Message).catch(() => undefined)
      await this._deleteMessage(Message).catch(error => {
        console.error(`[${SERVICE} AwsSqs] Error Deleting Message:`, { Message, error })
      })
    }
  }
}
