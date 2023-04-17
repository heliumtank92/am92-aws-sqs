import { nanoid } from 'nanoid'

export function getFifoSendOptions (options = {}) {
  const sendOptions = {
    MessageAttributes: options.messageAttributes || [],
    MessageDeduplicationId: options.messageDeduplicationId || nanoid(),
    MessageGroupId: options.messageGroupId || 'MESSAGE_GROUP',
    MessageSystemAttributes: options.messageSystemAttributes || []
  }

  return sendOptions
}

export const DEFAULT_FIFO_SEND_OPTIONS = {
  messageAttributes: [],
  messageDeduplicationId: '',
  messageGroupId: '',
  messageSystemAttributes: []
}

export function getStdSendOptions (options = {}) {
  const sendOptions = {
    DelaySeconds: options.delaySeconds || 0,
    MessageAttributes: options.messageAttributes || [],
    MessageSystemAttributes: options.messageSystemAttributes || []
  }

  return sendOptions
}

export const DEFAULT_STD_SEND_OPTIONS = {
  delaySeconds: 0,
  messageAttributes: [],
  messageSystemAttributes: []
}
