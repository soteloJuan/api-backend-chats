import { nanoid } from 'nanoid/async';
import { MyFriends } from '../../../entities/MyFriends';
import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';
import { DatabaseResponseInterface } from '../../../frameworks/common/interfaces/DatabaseResponse.interface';
import { InDataBaseMyFriendsRepository } from '../../../frameworks/persistance/InDatabaseMyFriendsRepository';
import { InDataBaseUserRepository } from '../../../frameworks/persistance/InDataBaseUserRepository';

export default  (myFriendsRepository: InDataBaseMyFriendsRepository, userRepository: InDataBaseUserRepository) => ({

    Excute: async(
        idUser: string,
        idFriend: string,
        idUserFromToken: string
    ) => {

        if(idUser !== idUserFromToken)throw new ApplicationException(`You don't Have access to this Route!`, 400);

        Object.entries({idUser, idFriend}).forEach( ([key, value]) => {
            if(value == null || value == undefined || value == ""){
                throw new ApplicationException(`The data is necessary: ${key}`, 400);
            }
        });

        if(idUser === idFriend) throw new ApplicationException('The Users are the same.', 400);

        const existRelationship: DatabaseResponseInterface = await myFriendsRepository.getByIdUserAndIdFriend(idUser, idFriend);
        if(existRelationship.data[0]) throw new ApplicationException('He is Already your Friend.', 400);

        const findByIdUser: DatabaseResponseInterface = await userRepository.findById(idUser);
        if(!findByIdUser.data[0]) throw new ApplicationException('The User Does Not Exist.', 400);

        const findByFriend: DatabaseResponseInterface = await userRepository.findById(idUser);
        if(!findByFriend.data[0]) throw new ApplicationException('The Friend Does Not Exist.', 400);

        const generatedID = 'myFriends-'+ await nanoid();
        const now = new Date();
        const newMyFriends = new MyFriends(generatedID, idUser, idFriend, now);

        const result = await myFriendsRepository.create(newMyFriends);
        
        return result;
    }
});