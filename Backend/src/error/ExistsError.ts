export class ExistsError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = 'ExistsError';
        this.statusCode = 400;
    }
}
