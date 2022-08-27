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

        if(!idMyFriends) throw new ApplicationException('The User Does Not Exist.', 400);

        const result = await myFriendsRepository.getByIdMyFriends(idMyFriends);
        
        return result;
    }
});