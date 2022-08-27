import shajs from 'sha.js';

import { InDataBaseUserRepository }  from '../../../frameworks/persistance/InDataBaseUserRepository';
import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';


export default  (userRepository: InDataBaseUserRepository) => ({

    Excute: async(
        idUser: string,
        password: string,
        idUserFromToken: string
    ) => {

        if(idUser !== idUserFromToken)throw new ApplicationException(`You don't Have access to this Route!`, 400);

        const entry = {idUser, password};  
        Object.entries(entry).forEach( ([key, value]) => {
            if(value == null || value == undefined || value == ""){
                throw new ApplicationException(`The data is necessary: ${key}`, 400);
            }
        });

        const findByIdUser: any = await userRepository.findById(idUser);
        
        if(!findByIdUser.data[0]) throw new ApplicationException('The User Does Not Exist.', 400);

        if(password.length < 6 ) throw new ApplicationException('The Password must have more than 6 characters', 400);
        
        const newPasswordSha = await shajs('sha256').update(password).digest('hex');


        if(newPasswordSha === findByIdUser.data[0].password) throw new ApplicationException('The Password Are The Same', 400);

        
        const result = await userRepository.updatePassword(idUser, newPasswordSha);
            
        return result;
        
    }
});