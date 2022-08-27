
import { InDataBaseUserRepository }  from '../../../frameworks/persistance/InDataBaseUserRepository';
import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';

export default  (userRepository: InDataBaseUserRepository) => ({

    Excute:async(
        idUser: string
    ) => {

        if(!idUser) throw new ApplicationException('The Id User is Requeried', 400);

        const result = await userRepository.findById(idUser);

        return result;
    }
});