export class ApplicationException extends Error{
    status = 400;
    constructor(message = 'An unexpected error ocurred', status: number){
        super(message);
        this.status = status;
    }

}