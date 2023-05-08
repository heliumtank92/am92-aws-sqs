const DEFAULT_HANDLERS = {
  processMessage: async (Message = {}) => undefined,
  shouldRetry: async (_error, Message = {}) => ({ retry: false, visibilityTimeout: 0 }),
  onRetryReject: async (Message = {}) => undefined,
  shouldReceiveMessages: async (Message = {}) => true
}

export default DEFAULT_HANDLERS
