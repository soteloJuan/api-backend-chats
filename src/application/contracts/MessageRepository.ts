import { DatabaseResponseInterface } from '../../frameworks/common/interfaces/DatabaseResponse.interface';
import { Message } from '../../entities/Message';

export interface MessageRepository {

    create(entry: Message): Promise<DatabaseResponseInterface>;

    getByIdMessage(idMessage: string): Promise<DatabaseResponseInterface>;

    getAllByIdUserAndIdConversation(idUser: string,  idConversation: string): Promise<DatabaseResponseInterface>;

    getAllByIdConversation(idConversation: string): Promise<DatabaseResponseInterface>;

    removeByIdMessage(idMessage: string): Promise<DatabaseResponseInterface>;
}

