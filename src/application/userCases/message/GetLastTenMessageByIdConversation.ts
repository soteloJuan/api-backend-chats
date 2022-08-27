import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';
import { InDataBaseMessageRepository } from '../../../frameworks/persistance/InDatabaseMessageRepository';

export default  (messageRepository: InDataBaseMessageRepository) => ({

    Excute: async(
        idConversation: string,
        numberPage: number
    ) => {

        idConversation = idConversation.trim();
        if(idConversation == "") throw new ApplicationException('The idConversation is requiered.', 400);

        const result = await messageRepository.getLastTenMessageByIdConversation(idConversation, numberPage);
        
        return result;
    }

});
