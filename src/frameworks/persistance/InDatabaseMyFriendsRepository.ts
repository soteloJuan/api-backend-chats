import { Pool } from 'mysql2';
import { MyFriendsRepository } from '../../application/contracts/MyFriendsRepository';
import { MyFriends } from '../../entities/MyFriends';
import { DatabaseResponseInterface } from '../common/interfaces/DatabaseResponse.interface';


export class InDataBaseMyFriendsRepository implements MyFriendsRepository{

    connection: Pool;

    constructor(connection: Pool){
        this.connection = connection;
    }

    async create(entry: MyFriends): Promise<DatabaseResponseInterface> {
        try{
            await this.connection
            .execute('INSERT INTO myFriends(idMyfriends, idUser, idFriend, createDate) VALUES(?, ?, ?, ?)', [entry.idMyFriends, entry.idUser, entry.idFriend, entry.createDate]);

            const response: DatabaseResponseInterface = {
                message: 'My Friend Created Successfully',
                data: []
            };
            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async getByIdMyFriends(idMyFriends: string): Promise<DatabaseResponseInterface> {
        try{

            const result: any = await this.connection.execute('SELECT * FROM myFriends WHERE idMyFriends = ? ',[idMyFriends]);

            const response: DatabaseResponseInterface = {
                message: 'MyFriend Queried Successfully',
                data: result[0]
            };
            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async getByIdUserAndIdFriend(idUser: string, idFriend: string): Promise<DatabaseResponseInterface> {
        try{

            const result: any = await this.connection.execute('SELECT * FROM myFriends WHERE idUser = ? AND idFriend = ?',[idUser, idFriend]);

            const response: DatabaseResponseInterface = {
                message: 'MyFriend Queried Successfully',
                data: result[0]
            };
            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async getAllMyFriends(idUser: string): Promise<DatabaseResponseInterface> {
        try{

            const result: any = await this.connection.execute('SELECT * FROM myFriends WHERE idUser = ? ',[idUser]);

            const response: DatabaseResponseInterface = {
                message: 'MyFriends Queried Successfully',
                data: result[0]
            };
            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async removeByIdMyFriends(idMyFriends: string): Promise<DatabaseResponseInterface> {
        try{

            const result: any = await this.connection.execute('DELETE FROM myFriends WHERE idMyFriends = ? ',[idMyFriends]);

            const response: DatabaseResponseInterface = {
                message: 'MyFriend Removed Successfully',
                data: result[0]
            };

            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }

    }
    
    async removeByIdUserAndIdFriend(idUser: string ,idFriend: string): Promise<DatabaseResponseInterface> {
        try{

            const result: any = await this.connection.execute('DELETE FROM myFriends WHERE idUser = ? AND idFriend = ? ',[idUser, idFriend]);

            const response: DatabaseResponseInterface = {
                message: 'MyFriend Removed Successfully',
                data: result[0]
            };

            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }

    }

}

