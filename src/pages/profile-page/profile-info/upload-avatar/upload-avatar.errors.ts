export class MaxFileSizeExceededError extends Error {
    constructor(message?: string) {
        super();
        this.message = message ?? 'File size is too large';
    }
}
