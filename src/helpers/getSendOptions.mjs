import { nanoid } from 'nanoid'

export default function getSendOptions (options = {}) {
  const sendOptions = {
    DelaySeconds: options.delaySeconds || 0,
    MessageAttributes: options.messageAttributes || [],
    MessageDeduplicationId: options.messageDeduplicationId || nanoid(),
    MessageGroupId: options.messageGroupId || 'MESSAGE_GROUP',
    MessageSystemAttributes: options.messageSystemAttributes || []
  }

  return sendOptions
}

export const DEFAULT_SEND_OPTIONS = {
  delaySeconds: 0,
  messageAttributes: [],
  messageDeduplicationId: '',
  messageGroupId: 'MESSAGE_GROUP',
  messageSystemAttributes: []
}
