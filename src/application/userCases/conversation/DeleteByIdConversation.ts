import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';
import { InDataBaseConversationRepository } from '../../../frameworks/persistance/InDatabaseConversationRepository';

export default  (conversationRepository: InDataBaseConversationRepository) => ({

    Excute: async(
        idConversation: string
    ) => {

        idConversation = idConversation.trim();

        if(idConversation == "") throw new ApplicationException(`The IdConversation Is Requiered`, 400);

        const result = await conversationRepository.remoteByIdConversation(idConversation);
        
        return result;
    }
});