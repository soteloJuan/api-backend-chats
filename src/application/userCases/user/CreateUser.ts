import { nanoid } from 'nanoid/async';
import shajs from 'sha.js';

import { InDataBaseUserRepository }  from '../../../frameworks/persistance/InDataBaseUserRepository';
import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';
import { User } from '../../../entities/User';

// Custom Validationos
import { OnlyLetterInText, IsAValidEmail } from '../../../frameworks/common/customValidations/Validations';

// interfaces
import { DatabaseResponseInterface } from '../../../frameworks/common/interfaces/DatabaseResponse.interface';

export default  (userRepository: InDataBaseUserRepository) => ({

    Excute: async(
        fullName: string,
        email: string,
        aboutMe = 'Hello!',
        status = 'I am available',
        userName: string,
        password: string,
        role = 'user'
    ) => {

        const entry = {fullName, email, userName, password};  
        Object.entries(entry).forEach( ([key, value]) => {
            if(value == null || value == undefined || value == ""){
                throw new ApplicationException(`The data is necessary: ${key}`, 400);
            }
        });

        const findByUserName: DatabaseResponseInterface = await userRepository.findByUserName(userName);
        if(findByUserName.data[0]) throw new ApplicationException('The User Name already Exists', 400);
        if(userName.length < 3) throw new ApplicationException('The User Name must have more than 3 characters', 400);

        if(password.length < 6 ) throw new ApplicationException('The Password must have more than 6 characters', 400);
        password = await shajs('sha256').update(password).digest('hex');

        const haveOnlyLetters = OnlyLetterInText(fullName);
        if(!haveOnlyLetters && fullName.length < 3) throw new ApplicationException('The Full Name must have more than 3 characters', 400);

        const isAValidEmail = IsAValidEmail(email);
        if(!isAValidEmail) throw new ApplicationException('The Email is Invalid', 400);

        const generatedID = 'user-'+ await nanoid();
        const now = new Date();

        const newUser = new User(generatedID, fullName, email, aboutMe, status, userName, '', '', '','', password, now, role, true);

        const result = await userRepository.create(newUser);

        return result;
    }
});
