export default class AwsSqs {
    constructor(config?: {
        CONNECTION_CONFIG: {
            region: string;
        };
        QUEUE_URL: string;
        POLL_CRON_TIME: string;
        POLL_CRON_TIMEZONE: string;
        RECEIVE_OPTIONS: {
            ATTRIBUTE_NAMES: string[];
            MAX_NUMBER_OF_MESSAGES: string | number;
            MESSAGE_ATTRIBUTE_NAMES: string[];
            VISIBILITY_TIMEOUT: string | number;
            WAIT_TIME_SECONDS: string | number;
        };
    });
    config: {
        CONNECTION_CONFIG: {
            region: string;
        };
        QUEUE_URL: string;
        POLL_CRON_TIME: string;
        POLL_CRON_TIMEZONE: string;
        RECEIVE_OPTIONS: {
            ATTRIBUTE_NAMES: string[];
            MAX_NUMBER_OF_MESSAGES: string | number;
            MESSAGE_ATTRIBUTE_NAMES: string[];
            VISIBILITY_TIMEOUT: string | number;
            WAIT_TIME_SECONDS: string | number;
        };
    };
    client: SQSClient;
    _sendMessage: (attrs?: {}) => Promise<{
        MD5OfMessageBody?: string;
        MD5OfMessageAttributes?: string;
        MD5OfMessageSystemAttributes?: string;
        MessageId?: string;
        SequenceNumber?: string;
    }>;
    _receiveMessages: (attrs?: {}) => Promise<import("@aws-sdk/client-sqs").Message[]>;
    _deleteMessage: (attrs?: {}) => Promise<void>;
    _changeMessageVisibility: (attrs?: {}) => Promise<void>;
}
import { SQSClient } from "@aws-sdk/client-sqs/dist-types/SQSClient.js";
