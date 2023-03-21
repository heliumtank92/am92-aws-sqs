export default function getSendOptions(options?: {}): {
    DelaySeconds: any;
    MessageAttributes: any;
    MessageDeduplicationId: any;
    MessageGroupId: any;
    MessageSystemAttributes: any;
};
export namespace DEFAULT_SEND_OPTIONS {
    const delaySeconds: number;
    const messageAttributes: any[];
    const messageDeduplicationId: string;
    const messageGroupId: string;
    const messageSystemAttributes: any[];
}
