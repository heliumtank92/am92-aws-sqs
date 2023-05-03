export default class FifoSqsSdk extends SqsSdk {
    send(messageBody?: string, options?: {
        messageAttributes: any[];
        messageDeduplicationId: string;
        messageGroupId: string;
        messageSystemAttributes: any[];
    }): Promise<{
        MD5OfMessageBody?: string;
        MD5OfMessageAttributes?: string;
        MD5OfMessageSystemAttributes?: string;
        MessageId?: string;
        SequenceNumber?: string;
    }>;
}
import SqsSdk from "./SqsSdk.mjs";
