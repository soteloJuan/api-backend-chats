import  { Pool } from 'mysql2';
import { User } from '../../entities/User';
import { DatabaseResponseInterface } from '../common/interfaces/DatabaseResponse.interface';
import { UserRepository } from '../../application/contracts/UserRepository';

export class InDataBaseUserRepository implements UserRepository{

    connection: Pool;

    constructor(connection: Pool){
        this.connection = connection;
    }

    async create(entry: User): Promise<DatabaseResponseInterface> {
        try{
            await this.connection
            .execute('INSERT INTO user(idUser,fullName,email,aboutMe,status,userName,idImage,urlImage,idWallpaper,urlWallpaper,password,createDate,role,active) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [entry.idUser, entry.fullName, entry.email, entry.aboutMe, entry.status, entry.userName, entry.idImage, entry.urlImage, entry.idWallpaper, entry.urlWallpaper, entry.password, entry.createDate, entry.role, entry.active]);
            const response: DatabaseResponseInterface = {
                message: 'User Created Successfully',
                data: []
            };
            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async findById(id: string): Promise<DatabaseResponseInterface> {
        try{

            const result: any = await this.connection.execute('SELECT * FROM user WHERE idUser = ? ',[id]);
            const response: DatabaseResponseInterface = {
                message: 'User Queried Successfully',
                data: result[0]
            };
            return  response;
        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async findByUserName(userName: string): Promise<DatabaseResponseInterface> {
        try{

            const result: any = await this.connection.execute('SELECT * FROM user WHERE userName = ? ',[userName]);
            const response: DatabaseResponseInterface = {
                message: 'User Queried Successfully',
                data: result[0]
            };

            return  response;
        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async findByUserNameLike(userName: string):Promise<DatabaseResponseInterface>{
        try{
            const userModify = `${userName}%`;
            const result: any = await this.connection.execute('SELECT * FROM user WHERE userName LIKE ?',[userModify]);
            const response: DatabaseResponseInterface = {
                message: 'User Queried Successfully',
                data: result[0]
            };

            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async all(): Promise<DatabaseResponseInterface> {
        try{

            const result: any  = await this.connection.execute('SELECT * FROM user');
            const response: DatabaseResponseInterface = {
                message: 'Users Queried Successfully',
                data: result[0]
            };

            return response;

        }catch(err){
            throw new Error('Error in the System');
        }

    }

    async updateBasic(entry: User): Promise<DatabaseResponseInterface> {
        try{

            await this.connection.execute('UPDATE User SET fullName = ?,email = ?,aboutMe = ?,status = ?,userName = ? WHERE idUser = ?', [ entry.fullName, entry.email, entry.aboutMe, entry.status, entry.userName, entry.idUser]);
            const response: DatabaseResponseInterface = {
                message: 'User Updated Successfully',
                data: []
            };

            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async updatePassword(idUser: string, password: string): Promise<DatabaseResponseInterface> {
        try{

            await this.connection.execute('UPDATE User SET password = ? WHERE idUser = ?', [password, idUser]);
            const response: DatabaseResponseInterface = {
                message: 'Password Updated Successfully',
                data: []
            };

            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async updateImage(idUser: string, idImage: string, urlImage: string): Promise<DatabaseResponseInterface> {
        try{

            await this.connection.execute('UPDATE User SET  idImage = ?, urlImage = ? WHERE idUser = ?', [idImage, urlImage, idUser]);
            const response: DatabaseResponseInterface = {
                message: 'Image Updated Successfully',
                data: []
            };

            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async updateImageWallpaper(idUser: string, idWallpaper: string, urlWallpaper: string): Promise<DatabaseResponseInterface> {
        try{

            await this.connection.execute('UPDATE User SET  idWallpaper = ?, urlWallpaper = ? WHERE idUser = ?', [idWallpaper, urlWallpaper, idUser]);
            const response: DatabaseResponseInterface = {
                message: 'Image Updated Successfully',
                data: []
            };

            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

    async removeUser(idUser: string): Promise<DatabaseResponseInterface> {
        try{
            await this.connection.execute('DELETE FROM User WHERE idUser = ?', [idUser]);
            const response: DatabaseResponseInterface = {
                message: 'User Deleted Successfully',
                data: []
            };

            return  response;

        }catch(err){
            throw new Error('Error in the System');
        }
    }

}
