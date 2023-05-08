export default class SqsSdk extends AwsSqs {
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
        shouldReceiveMessages: (Message?: {}) => Promise<boolean>;
    });
    handlers: {
        processMessage: (Message?: {}) => Promise<any>;
        shouldRetry: (_error: any, Message?: {}) => Promise<{
            retry: boolean;
            visibilityTimeout: number;
        }>;
        onRetryReject: (Message?: {}) => Promise<any>;
        shouldReceiveMessages: (Message?: {}) => Promise<boolean>;
    };
    send(messageBody: string, options: any): Promise<{
        MD5OfMessageBody?: string;
        MD5OfMessageAttributes?: string;
        MD5OfMessageSystemAttributes?: string;
        MessageId?: string;
        SequenceNumber?: string;
    }>;
    startProcessing(): CronJob;
    _createCronJob: () => CronJob;
    _onTick: () => Promise<void>;
    _processMessages: (Messages?: any[]) => Promise<void>;
    _processMessage: (Message?: {}) => Promise<void>;
    _handleProcessMessageFailure: (error: any, Message?: {}) => Promise<void>;
}
import AwsSqs from "./AwsSqs.mjs";
import { CronJob } from "cron";
