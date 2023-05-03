import { SERVICE } from './CONFIG.mjs'

const DEFAULT_ERROR_MSG = 'Aws Sqs Error'
const DEFAULT_ERROR_STATUS_CODE = 500
const DEFAULT_ERROR_CODE = 'AWS_SQS_ERROR'

export default class SqsError extends Error {
  constructor (e = {}, eMap) {
    if (e._isCustomError && !eMap) { return e }

    super()

    const { message, statusCode, errorCode } = eMap || {}
    const {
      message: eMessage,
      $metadata: {
        httpStatusCode: eStatusCode = 500
      } = {}
    } = e

    for (const eKey in e) {
      this[eKey] = e[eKey]
    }

    this._isCustomError = true
    this._isSqsError = true
    this.service = SERVICE
    this.message = message || eMessage || DEFAULT_ERROR_MSG
    this.statusCode = statusCode || eStatusCode || DEFAULT_ERROR_STATUS_CODE
    this.errorCode = errorCode || DEFAULT_ERROR_CODE
    this.error = e
  }
}
