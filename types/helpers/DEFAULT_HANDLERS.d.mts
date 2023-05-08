export default DEFAULT_HANDLERS;
declare namespace DEFAULT_HANDLERS {
    function processMessage(Message?: {}): Promise<any>;
    function shouldRetry(_error: any, Message?: {}): Promise<{
        retry: boolean;
        visibilityTimeout: number;
    }>;
    function onRetryReject(Message?: {}): Promise<any>;
    function shouldReceiveMessages(Message?: {}): Promise<boolean>;
}
