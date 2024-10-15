export class ExistsMensage extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = 'ExistsMensage';
        this.statusCode = 400;
    }
}
