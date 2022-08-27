import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';
import { InDataBaseConversationRepository } from '../../../frameworks/persistance/InDatabaseConversationRepository';

export default  (conversationRepository: InDataBaseConversationRepository) => ({

    Excute: async(
        idUserOneTwo: string
    ) => {

        Object.entries({idUserOneTwo}).forEach( ([key, value]) => {
            if(value == null || value == undefined || value == ""){
                throw new ApplicationException(`The data is necessary: ${key}`, 400);
            }
        });

        const result = await conversationRepository.getAllByUserOneTwo(idUserOneTwo);
        
        return result;
    }
});
