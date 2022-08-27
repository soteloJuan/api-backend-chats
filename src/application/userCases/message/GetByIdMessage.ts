import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';
import { InDataBaseMessageRepository } from '../../../frameworks/persistance/InDatabaseMessageRepository';

export default  (messageRepository: InDataBaseMessageRepository) => ({

    Excute: async(
        idMessage: string,
    ) => {

        idMessage = idMessage.trim();
        if(idMessage == "") throw new ApplicationException('The idMessage is requiered.', 400);

        const result = await messageRepository.getByIdMessage(idMessage);
        
        return result;
    }

});
