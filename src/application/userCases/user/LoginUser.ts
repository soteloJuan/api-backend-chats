import shajs from 'sha.js';

import { InDataBaseUserRepository }  from '../../../frameworks/persistance/InDataBaseUserRepository';
import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';
import { GenerateJWT } from '../../../frameworks/common/helper/generateToken';

import { DatabaseResponseInterface } from '../../../frameworks/common/interfaces/DatabaseResponse.interface';

export default  (userRepository: InDataBaseUserRepository) => ({

    Excute:async(
        userName: string,
        password: string
    ) => {

        if(!userName) throw new ApplicationException('The User Name is Requeried', 400);
        if(!password) throw new ApplicationException('The Password is Requeried', 400);
        if(password.length < 6 ) throw new ApplicationException('The Password must have more than 6 characters', 400);


        const findByUserName: any = await userRepository.findByUserName(userName);
        if(!findByUserName.data[0]) {
            throw new ApplicationException('The UserName Does Not Exist.', 400);
        }
        const passwordUser = findByUserName.data[0].password;
        const idUser = findByUserName.data[0].idUser;

        const passwordLogin = await shajs('sha256').update(password).digest('hex');
        if(passwordLogin !== passwordUser){
            throw new ApplicationException('The Password is Not Correct', 400);
        }

        const token = await GenerateJWT(idUser);

        const result: DatabaseResponseInterface = {
            message:'Successfully Logged',
            data: findByUserName.data[0],
            token: token
        };

        return result;
    }
});
