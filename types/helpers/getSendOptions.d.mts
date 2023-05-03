export function getFifoSendOptions(options?: {}): {
    MessageAttributes: any;
    MessageDeduplicationId: any;
    MessageGroupId: any;
    MessageSystemAttributes: any;
};
export function getStdSendOptions(options?: {}): {
    DelaySeconds: any;
    MessageAttributes: any;
    MessageSystemAttributes: any;
};
export namespace DEFAULT_FIFO_SEND_OPTIONS {
    const messageAttributes: any[];
    const messageDeduplicationId: string;
    const messageGroupId: string;
    const messageSystemAttributes: any[];
}
export namespace DEFAULT_STD_SEND_OPTIONS {
    export const delaySeconds: number;
    const messageAttributes_1: any[];
    export { messageAttributes_1 as messageAttributes };
    const messageSystemAttributes_1: any[];
    export { messageSystemAttributes_1 as messageSystemAttributes };
}
