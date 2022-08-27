import { InDataBaseUserRepository } from './InDataBaseUserRepository';
import { InDataBaseMyFriendsRepository } from './InDatabaseMyFriendsRepository';
import { InDataBaseMessageRepository } from './InDatabaseMessageRepository';
import { InDataBaseConversationRepository } from './InDatabaseConversationRepository';

import { DataBasesService } from '../../application/contracts/DatabasesServices';

export class InMemoryDataBasesService extends DataBasesService{

    constructor(){
        super();
        this.userRepository = new InDataBaseUserRepository(this.conexionMySql);
        this.myFriendsRepository = new InDataBaseMyFriendsRepository(this.conexionMySql);
        this.messageRepositor = new InDataBaseMessageRepository(this.conexionMySql);
        this.conversationRepository = new InDataBaseConversationRepository(this.conexionMySql);
    }

}
