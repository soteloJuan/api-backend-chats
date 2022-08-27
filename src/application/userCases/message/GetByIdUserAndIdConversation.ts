import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';

import { InDataBaseMessageRepository } from '../../../frameworks/persistance/InDatabaseMessageRepository';
import { InDataBaseUserRepository } from '../../../frameworks/persistance/InDataBaseUserRepository';
import { InDataBaseConversationRepository } from '../../../frameworks/persistance/InDatabaseConversationRepository';
import { DatabaseResponseInterface } from '../../../frameworks/common/interfaces/DatabaseResponse.interface';


export default  (messageRepository: InDataBaseMessageRepository, userRepository: InDataBaseUserRepository, conversationRepository: InDataBaseConversationRepository) => ({

    Excute: async(
        idUser: string,
        idConversation: string
    ) => {

        Object.entries({idUser, idConversation}).forEach( ([key, value]) => {
            if(value == null || value == undefined || value == ""){
                throw new ApplicationException(`The data is necessary: ${key}`, 400);
            }
        });

        const findByidUserSender: DatabaseResponseInterface = await userRepository.findById(idUser);
        if(!findByidUserSender.data[0]) throw new ApplicationException('The User Does Not Exist.', 400);

        const findByIdConverasation: DatabaseResponseInterface = await conversationRepository.getByIdConversation(idConversation);
        if(!findByIdConverasation.data[0]) throw new ApplicationException('The Conversation Does Not Exist.', 400);


        const result = await messageRepository.getAllByIdUserAndIdConversation(idUser, idConversation);
        
        return result;
    }

});
