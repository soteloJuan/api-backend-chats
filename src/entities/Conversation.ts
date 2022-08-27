export class Conversation{
    constructor(

        public idConversation: string,
        public idUserOne: string,
        public idUserTwo: string,
        public createDate: Date
    ){
        this.idConversation = idConversation;
        this.idUserOne = idUserOne;
        this.idUserTwo = idUserTwo;
        this.createDate = createDate;
    }
}