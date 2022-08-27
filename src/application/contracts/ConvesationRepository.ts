import { Conversation } from '../../entities/Conversation';
import { DatabaseResponseInterface } from '../../frameworks/common/interfaces/DatabaseResponse.interface';


export interface ConversationRepository{

    create(entry: Conversation): Promise<DatabaseResponseInterface>;

    getByIdConversation(idConversation: string): Promise<DatabaseResponseInterface>;

    getByUserOneAndUserTwo(idUserOne: string, idUserTwo: string): Promise<DatabaseResponseInterface>;

    getAllByUserOneTwo(idUserOneTwo: string): Promise<DatabaseResponseInterface>;

    remoteByIdConversation(idConversation: string): Promise<DatabaseResponseInterface>;

}