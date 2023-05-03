export default function getReceiveOptions(RECEIVE_OPTIONS?: {
    ATTRIBUTE_NAMES: string[];
    MAX_NUMBER_OF_MESSAGES: number;
    MESSAGE_ATTRIBUTE_NAMES: string[];
    VISIBILITY_TIMEOUT: number;
    WAIT_TIME_SECONDS: number;
}): {
    AttributeNames: string[];
    MaxNumberOfMessages: number;
    MessageAttributeNames: string[];
    VisibilityTimeout: number;
    WaitTimeSeconds: number;
};
export namespace DEFAULT_RECEIVE_OPTIONS {
    const ATTRIBUTE_NAMES: string[];
    const MAX_NUMBER_OF_MESSAGES: number;
    const MESSAGE_ATTRIBUTE_NAMES: string[];
    const VISIBILITY_TIMEOUT: number;
    const WAIT_TIME_SECONDS: number;
}
