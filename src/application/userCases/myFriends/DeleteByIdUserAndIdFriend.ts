import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';
import { InDataBaseMyFriendsRepository } from '../../../frameworks/persistance/InDatabaseMyFriendsRepository';

export default  (myFriendsRepository: InDataBaseMyFriendsRepository) => ({

    Excute: async(
        idUser: string,
        idFriend: string,
        idUserFromToken: string
    ) => {

        idFriend = idFriend.trim();
        
        if(idUser !== idUserFromToken)throw new ApplicationException(`You don't Have access to this Route!`, 400);

        if(!idUser || idUser == "" || idUser == undefined || idUser == null) throw new ApplicationException('The ID User is Required.', 400);
        if(!idFriend || idFriend == "" || idFriend == undefined || idFriend == null) throw new ApplicationException('The ID Friend is Required.', 400);

        const result = await myFriendsRepository.removeByIdUserAndIdFriend(idUser, idFriend);
        
        return result;
    }
});
