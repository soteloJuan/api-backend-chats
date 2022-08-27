import { MyFriends } from "../../entities/MyFriends";
import { DatabaseResponseInterface } from "../../frameworks/common/interfaces/DatabaseResponse.interface";


export interface  MyFriendsRepository{

    create(entry: MyFriends): Promise<DatabaseResponseInterface>;

    getByIdMyFriends(idMyFriends: string): Promise<DatabaseResponseInterface>;

    getAllMyFriends(idUser: string): Promise<DatabaseResponseInterface>;

    removeByIdMyFriends(idMyFriends: string): Promise<DatabaseResponseInterface>;

    removeByIdUserAndIdFriend(idUser: string, idFriend: string): Promise<DatabaseResponseInterface>;


}