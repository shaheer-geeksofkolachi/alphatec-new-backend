export declare class CustomValidationPipe {
    private validationPipe;
    constructor(options: any);
    transform(value: any, metadata: any): Promise<any>;
    private flattenValidationErrors;
}
