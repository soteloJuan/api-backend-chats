import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';
import { InDataBaseMessageRepository } from '../../../frameworks/persistance/InDatabaseMessageRepository';

export default  (messageRepository: InDataBaseMessageRepository) => ({

    Excute: async(
        idConversation: string,
    ) => {

        idConversation = idConversation.trim();
        if(idConversation == "") throw new ApplicationException('The idConversation is requiered.', 400);

        const result = await messageRepository.getLastMessageByIdConversation(idConversation);
        
        return result;
    }

});
