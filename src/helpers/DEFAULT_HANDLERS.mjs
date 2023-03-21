const DEFAULT_HANDLERS = {
  processMessage: async (Message = {}) => undefined,
  shouldRetry: async (_error, Message = {}) => ({ retry: false, visibilityTimeout: 0 }),
  onRetryReject: async (Message = {}) => undefined
}

export default DEFAULT_HANDLERS
