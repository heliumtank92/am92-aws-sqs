export default class SqsError extends Error {
    constructor(e: {}, eMap: any);
    _isCustomError: boolean;
    _isSqsError: boolean;
    service: string;
    message: any;
    statusCode: any;
    errorCode: any;
    error: {};
}
