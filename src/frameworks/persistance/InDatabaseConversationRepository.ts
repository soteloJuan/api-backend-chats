import { Pool } from 'mysql2';
import { Conversation } from '../../entities/Conversation';
import { DatabaseResponseInterface } from '../common/interfaces/DatabaseResponse.interface';
import { ConversationRepository } from '../../application/contracts/ConvesationRepository';

export class InDataBaseConversationRepository implements ConversationRepository{

    connection: Pool;

    constructor(connection: Pool){
        this.connection = connection;
    }

    async create(entry: Conversation): Promise<DatabaseResponseInterface> {
        try{

            await this.connection
            .execute('INSERT INTO conversation(idConversation, idUserOne, idUserTwo, createDate) VALUES(?, ?, ?, ?)', [entry.idConversation, entry.idUserOne, entry.idUserTwo, entry.createDate]);

            const response: DatabaseResponseInterface = {
                message: 'Coversation Created Successfully',
                data: []
            };

            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async getByIdConversation(idConversation: string): Promise<DatabaseResponseInterface> {
        try{

            const result: any = await this.connection
            .execute('SELECT * FROM conversation WHERE idConversation = ? ', [idConversation]);

            const response: DatabaseResponseInterface = {
                message: 'Conversation Queried Successfully',
                data: result[0]
            };

            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async getByUserOneAndUserTwo(idUserOne: string, idUserTwo: string): Promise<DatabaseResponseInterface> {
        try{

            const result: any = await this.connection
            .execute('SELECT * FROM conversation WHERE idUserOne = ? AND idUserTwo = ? ', [idUserOne, idUserTwo]);

            const response: DatabaseResponseInterface = {
                message: 'Conversation Queried Successfully',
                data: result[0]
            };

            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async getAllByUserOneTwo(idUserOneTwo: string): Promise<DatabaseResponseInterface> {
        try{

            const result: any = await this.connection
            .execute('SELECT * FROM conversation WHERE idUserOne = ? OR idUserTwo = ? ', [idUserOneTwo, idUserOneTwo]);

            const response: DatabaseResponseInterface = {
                message: 'Conversation Queried Successfully',
                data: result[0]
            };

            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async remoteByIdConversation(idConversation: string): Promise<DatabaseResponseInterface> {
        try{

            await this.connection
            .execute('DELETE FROM conversation WHERE idConversation = ? ', [idConversation]);

            const response: DatabaseResponseInterface = {
                message: 'Conversation Deleted Successfully',
                data: []
            };

            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

}
