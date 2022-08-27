
import { InDataBaseUserRepository }  from '../../../frameworks/persistance/InDataBaseUserRepository';
import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';

export default  (userRepository: InDataBaseUserRepository) => ({

    Excute:async(
        userName: string
    ) => {

        if(!userName) throw new ApplicationException('The Id User the UserName', 400);

        const result = await userRepository.findByUserNameLike(userName);

        return result;
    }
});