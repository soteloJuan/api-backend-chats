import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';
import { DatabaseResponseInterface } from '../../../frameworks/common/interfaces/DatabaseResponse.interface';
import { InDataBaseConversationRepository } from '../../../frameworks/persistance/InDatabaseConversationRepository';
import { InDataBaseUserRepository } from '../../../frameworks/persistance/InDataBaseUserRepository';

export default  (conversationRepository: InDataBaseConversationRepository, userRepository: InDataBaseUserRepository) => ({

    Excute: async(
        idUserOne: string,
        idUserTwo: string
    ) => {

        Object.entries({idUserOne, idUserTwo}).forEach( ([key, value]) => {
            if(value == null || value == undefined || value == ""){
                throw new ApplicationException(`The data is necessary: ${key}`, 400);
            }
        });

        if(idUserOne === idUserTwo) throw new ApplicationException('The Users are the same.', 400);
        
        const findByFriendOne: DatabaseResponseInterface = await userRepository.findById(idUserOne);
        if(!findByFriendOne.data[0]) throw new ApplicationException('The User Does Not Exist.', 400);

        const findByFriendTwo: DatabaseResponseInterface = await userRepository.findById(idUserTwo);
        if(!findByFriendTwo.data[0]) throw new ApplicationException('The User Does Not Exist.', 400);


        const existConversationOne: DatabaseResponseInterface = await conversationRepository.getByUserOneAndUserTwo(idUserOne, idUserTwo);
        if(existConversationOne.data[0]) return existConversationOne;
        
        const existConversationTwo: DatabaseResponseInterface = await conversationRepository.getByUserOneAndUserTwo(idUserTwo, idUserOne);
        
        return existConversationTwo;

    }
});