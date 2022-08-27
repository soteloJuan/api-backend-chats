export class Message {
    constructor(
        public idMessage: string,
        public idUser: string,
        public body: string,
        public idConversation: string,
        public active: boolean,
        public createDate: Date,
    ){
        this.idMessage = idMessage;
        this.idUser = idUser;
        this.body = body;
        this.active = active;
        this.createDate = createDate;
    }
}