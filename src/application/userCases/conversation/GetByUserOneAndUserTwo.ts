import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';
import { InDataBaseConversationRepository } from '../../../frameworks/persistance/InDatabaseConversationRepository';

export default  (conversationRepository: InDataBaseConversationRepository) => ({

    Excute: async(
        idUserOne: string,
        idUserTwo: string
    ) => {

        Object.entries({idUserOne, idUserTwo}).forEach( ([key, value]) => {
            if(value == null || value == undefined || value == ""){
                throw new ApplicationException(`The data is necessary: ${key}`, 400);
            }
        });

        const result = await conversationRepository.getByUserOneAndUserTwo(idUserOne, idUserTwo);
        
        return result;
    }
});
