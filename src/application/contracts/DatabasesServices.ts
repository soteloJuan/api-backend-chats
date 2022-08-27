import { Pool } from 'mysql2';
import { createPool } from 'mysql2/promise';

import { InDataBaseUserRepository } from '../../frameworks/persistance/InDataBaseUserRepository';
import { InDataBaseMyFriendsRepository } from '../../frameworks/persistance/InDatabaseMyFriendsRepository';
import { InDataBaseMessageRepository } from '../../frameworks/persistance/InDatabaseMessageRepository';
import { InDataBaseConversationRepository } from '../../frameworks/persistance/InDatabaseConversationRepository';

/* Here all databases are initialized */

export class DataBasesService{


    userRepository!: InDataBaseUserRepository;
    myFriendsRepository!: InDataBaseMyFriendsRepository;
    messageRepositor!: InDataBaseMessageRepository;
    conversationRepository!: InDataBaseConversationRepository;
    conexionMySql!: Pool|any;

    constructor(){
        this.initDatabases();
    }

    async initDatabases(){
        await this.mySqlDB();
    }

    async mySqlDB(){
        try{
            this.conexionMySql = createPool({
                host: process.env.db_mysql_host,
                user: process.env.db_mysql_user,
                password: process.env.db_mysql_password,
                database: process.env.db_mysql_database,
                decimalNumbers: true
            });

        }catch(error){
            return null;
        }

    }

}