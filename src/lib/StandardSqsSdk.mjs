import SqsSdk from './SqsSdk.mjs'
import { DEFAULT_STD_SEND_OPTIONS, getStdSendOptions } from '../helpers/getSendOptions.mjs'

export default class StandardSqsSdk extends SqsSdk {
  async send (messageBody = '', options = DEFAULT_STD_SEND_OPTIONS) {
    const sendOptions = getStdSendOptions(options)
    const data = await super.send(messageBody, sendOptions)
    return data
  }
}
