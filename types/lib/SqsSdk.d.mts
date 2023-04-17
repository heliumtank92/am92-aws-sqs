export default class SqsSdk {
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
    }, handlers?: {
        processMessage: (Message?: {}) => Promise<any>;
        shouldRetry: (_error: any, Message?: {}) => Promise<{
            retry: boolean;
            visibilityTimeout: number;
        }>;
        onRetryReject: (Message?: {}) => Promise<any>;
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
    handlers: {
        processMessage: (Message?: {}) => Promise<any>;
        shouldRetry: (_error: any, Message?: {}) => Promise<{
            retry: boolean;
            visibilityTimeout: number;
        }>;
        onRetryReject: (Message?: {}) => Promise<any>;
    };
    send(messageBody: string, options: any): Promise<{
        MD5OfMessageBody?: string;
        MD5OfMessageAttributes?: string;
        MD5OfMessageSystemAttributes?: string;
        MessageId?: string;
        SequenceNumber?: string;
    }>;
    startProcessing(): CronJob;
    #private;
}
import { SQSClient } from "@aws-sdk/client-sqs/dist-types/SQSClient.js";
import { CronJob } from "cron";
