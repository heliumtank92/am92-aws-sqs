import SqsSdk from './SqsSdk.mjs'
import { DEFAULT_FIFO_SEND_OPTIONS, getFifoSendOptions } from '../helpers/getSendOptions.mjs'

export default class FifoSqsSdk extends SqsSdk {
  async send (messageBody = '', options = DEFAULT_FIFO_SEND_OPTIONS) {
    const sendOptions = getFifoSendOptions(options)
    const data = await super.send(messageBody, sendOptions)
    return data
  }
}
