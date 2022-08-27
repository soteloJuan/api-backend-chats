import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';
import { InDataBaseMessageRepository } from '../../../frameworks/persistance/InDatabaseMessageRepository';

export default  (messageRepository: InDataBaseMessageRepository) => ({

    Excute: async(
        idMessage: string
    ) => {

        idMessage = idMessage.trim();
        if(idMessage == "") throw new ApplicationException('The idMessage is requiered.', 400);

        const findByIdMessage = await messageRepository.getByIdMessage(idMessage);
        if(!findByIdMessage.data[0]) throw new ApplicationException('The Message Does not Exist.', 400);

        const result = await messageRepository.removeByIdMessage(idMessage);

        return result;

    }

});
