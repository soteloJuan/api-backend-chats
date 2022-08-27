import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';
import { InDataBaseMyFriendsRepository } from '../../../frameworks/persistance/InDatabaseMyFriendsRepository';

export default  (myFriendsRepository: InDataBaseMyFriendsRepository) => ({

    Excute: async(
        idUser: string,
        idMyFriends: string,
        idUserFromToken: string
    ) => {

        idMyFriends = idMyFriends.trim();
        
        if(idUser !== idUserFromToken)throw new ApplicationException(`You don't Have access to this Route!`, 400);

        if(!idMyFriends || idMyFriends == "" || idMyFriends == undefined || idMyFriends == null) throw new ApplicationException('The ID Does Not Exist.', 400);

        const findByIdMyFriends = await myFriendsRepository.getByIdMyFriends(idMyFriends);

        if(!findByIdMyFriends.data[0])  throw new ApplicationException('The MyFriend Does Not Exist.', 400);

        const result = await myFriendsRepository.removeByIdMyFriends(idMyFriends);
        
        return result;
    }
});
