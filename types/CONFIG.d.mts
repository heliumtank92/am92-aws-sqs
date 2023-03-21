export default CONFIG;
declare namespace CONFIG {
    export { CONNECTION_CONFIG };
    export { SQS_QUEUE_URL as QUEUE_URL };
    export { SQS_POLL_CRON_TIME as POLL_CRON_TIME };
    export { SQS_POLL_CRON_TIMEZONE as POLL_CRON_TIMEZONE };
    export namespace RECEIVE_OPTIONS {
        export const ATTRIBUTE_NAMES: string[];
        import MAX_NUMBER_OF_MESSAGES = INT_CONFIGS.SQS_MAX_NUMBER_OF_MESSAGES;
        export { MAX_NUMBER_OF_MESSAGES };
        export const MESSAGE_ATTRIBUTE_NAMES: string[];
        import VISIBILITY_TIMEOUT = INT_CONFIGS.SQS_VISIBILITY_TIMEOUT;
        export { VISIBILITY_TIMEOUT };
        import WAIT_TIME_SECONDS = INT_CONFIGS.SQS_WAIT_TIME_SECONDS;
        export { WAIT_TIME_SECONDS };
    }
}
export const SERVICE: string;
declare namespace CONNECTION_CONFIG {
    export { SQS_REGION as region };
}
declare const SQS_QUEUE_URL: string;
declare const SQS_POLL_CRON_TIME: string;
declare const SQS_POLL_CRON_TIMEZONE: string;
declare namespace INT_CONFIGS {
    export { SQS_MAX_NUMBER_OF_MESSAGES };
    export { SQS_VISIBILITY_TIMEOUT };
    export { SQS_WAIT_TIME_SECONDS };
}
declare const SQS_REGION: string;
declare const SQS_MAX_NUMBER_OF_MESSAGES: string | 10;
declare const SQS_VISIBILITY_TIMEOUT: string | 30;
declare const SQS_WAIT_TIME_SECONDS: string | 0;
