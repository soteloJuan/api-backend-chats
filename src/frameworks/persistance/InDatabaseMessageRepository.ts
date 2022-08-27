import { Pool } from 'mysql2';
import { MessageRepository } from '../../application/contracts/MessageRepository';
import { Message } from '../../entities/Message';
import { DatabaseResponseInterface } from '../common/interfaces/DatabaseResponse.interface';

export class InDataBaseMessageRepository implements MessageRepository{

    connection: Pool;

    constructor(connection: Pool){
        this.connection = connection;
    }

    async create(entry: Message): Promise<DatabaseResponseInterface> {
        try{

            await this.connection
            .execute('INSERT INTO message(idMessage, idUser, body, idConversation, active, createDate) VALUES(?, ?, ?, ?, ?, ?)', [entry.idMessage, entry.idUser, entry.body, entry.idConversation, entry.active, entry.createDate]);

            const response: DatabaseResponseInterface = {
                message: 'Message Created Successfully',
                data: []
            };

            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async getByIdMessage(idMessage: string) : Promise<DatabaseResponseInterface>{

        const result: any = await this.connection.execute('SELECT * FROM message WHERE idMessage = ? ',[idMessage]);

        const response: DatabaseResponseInterface = {
            message: 'Message Queried Successfully',
            data: result[0]
        };

        return  response;

    }

    async getAllByIdUserAndIdConversation(idUser: string, idConversation: string): Promise<DatabaseResponseInterface> {
        try{

            const result: any = await this.connection.execute('SELECT * FROM message WHERE idUser = ? AND idConversation = ?',[idUser, idConversation]);

            const response: DatabaseResponseInterface = {
                message: 'Messages Queried Successfully',
                data: result[0]
            };
            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async getAllByIdConversation(idConversation: string): Promise<DatabaseResponseInterface> {
        try{

            const result: any = await this.connection.execute('SELECT * FROM message WHERE idConversation = ?',[idConversation]);

            const response: DatabaseResponseInterface = {
                message: 'Messages Queried Successfully',
                data: result[0]
            };
            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async getLastTenMessageByIdConversation(idConversation: string, numberPage = 1): Promise<DatabaseResponseInterface> { // AQUI ES PROBABLE QUE AUMENTEMOS EL LIMITE
        try{
            const limit =  `${10 * numberPage}`;
            const result: any = await this.connection.execute('SELECT * FROM message WHERE idConversation = ? ORDER BY createDate DESC LIMIT ?',[idConversation, limit]);

            const response: DatabaseResponseInterface = {
                message: 'Messages Queried Successfully',
                data: result[0]
            };
            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async getLastMessageByIdConversation(idConversation: string): Promise<DatabaseResponseInterface> {
        try{

            const result: any = await this.connection.execute('SELECT * FROM message WHERE createDate = (SELECT MAX(createDate) FROM message WHERE idConversation = ?)',[idConversation]);

            const response: DatabaseResponseInterface = {
                message: 'Messages Queried Successfully',
                data: result[0]
            };
            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }



    async removeByIdMessage(idMessage: string): Promise<DatabaseResponseInterface> {
        try{

            await this.connection.execute('DELETE FROM message WHERE idMessage = ?', [idMessage]);

            const response: DatabaseResponseInterface = {
                message: 'Message Deleted Successfully',
                data: []
            };

            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

}
