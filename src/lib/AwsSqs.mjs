import {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
  ChangeMessageVisibilityCommand
} from '@aws-sdk/client-sqs'

import getReceiveOptions from '../helpers/getReceiveOptions.mjs'
import SqsError from '../SqsError.mjs'

import CONFIG from '../CONFIG.mjs'

export default class AwsSqs {
  constructor (config = CONFIG) {
    this.config = { ...CONFIG, ...config }
    const { CONNECTION_CONFIG } = this.config

    this.client = new SQSClient(CONNECTION_CONFIG)
  }

  _sendMessage = async (attrs = {}) => {
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

  _receiveMessages = async (attrs = {}) => {
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

  _deleteMessage = async (attrs = {}) => {
    try {
      const { client, config } = this
      const params = { ...attrs, QueueUrl: config.QUEUE_URL }
      const command = new DeleteMessageCommand(params)
      await client.send(command)
    } catch (error) {
      throw new SqsError(error)
    }
  }

  _changeMessageVisibility = async (attrs = {}) => {
    try {
      const { client, config } = this
      const params = { ...attrs, QueueUrl: config.QUEUE_URL }
      const command = new ChangeMessageVisibilityCommand(params)
      await client.send(command)
    } catch (error) {
      throw new SqsError(error)
    }
  }
}
