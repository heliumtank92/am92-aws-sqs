export default class StandardSqsSdk extends SqsSdk {
    send(messageBody?: string, options?: {
        delaySeconds: number;
        messageAttributes: any[];
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
