import { InDataBaseUserRepository }  from '../../../frameworks/persistance/InDataBaseUserRepository';
import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';
import { GenerateJWT } from '../../../frameworks/common/helper/generateToken';

import { DatabaseResponseInterface } from '../../../frameworks/common/interfaces/DatabaseResponse.interface';

export default  (userRepository: InDataBaseUserRepository) => ({

    Excute:async( idUserFromToken: string ) => {

        if(!idUserFromToken) throw new ApplicationException('The idUserFromToken is Requeried', 400);


        const findById: any = await userRepository.findById(idUserFromToken);

        if(!findById.data[0]) {
            throw new ApplicationException('The idUserFromToken Does Not Exist.', 400);
        }

        const token = await GenerateJWT(idUserFromToken);
        
        const result: DatabaseResponseInterface = {
            message:'Successfully Logged',
            data: findById.data[0],
            token: token
        };

        return result;
    }
});
