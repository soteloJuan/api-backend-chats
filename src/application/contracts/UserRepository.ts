import { User }  from '../../entities/User';
import { DatabaseResponseInterface } from '../../frameworks/common/interfaces/DatabaseResponse.interface';

export interface UserRepository{

    create(entry: User): Promise<DatabaseResponseInterface>;

    findById(id: string): Promise<DatabaseResponseInterface>;

    findByUserName(userName: string): Promise<DatabaseResponseInterface>;

    findByUserNameLike(userName: string):Promise<DatabaseResponseInterface>;

    all(): Promise<DatabaseResponseInterface>;

    updateBasic(entry: User): Promise<DatabaseResponseInterface>;
    
    updatePassword(idUser: string, password: string): Promise<DatabaseResponseInterface>;

    updateImage(idUser: string, idImage: string, urlImage: string): Promise<DatabaseResponseInterface>;

    updateImageWallpaper(idUser: string, idWallpaper: string, urlWallpaper: string): Promise<DatabaseResponseInterface>;

    removeUser(idUser: string): Promise<DatabaseResponseInterface>;

}