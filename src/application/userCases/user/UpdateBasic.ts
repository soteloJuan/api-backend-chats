import { InDataBaseUserRepository }  from '../../../frameworks/persistance/InDataBaseUserRepository';
import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';
import { User } from '../../../entities/User';

// Custom Validationos
import { OnlyLetterInText, IsAValidEmail } from '../../../frameworks/common/customValidations/Validations';

// interfaces
import { DatabaseResponseInterface } from '../../../frameworks/common/interfaces/DatabaseResponse.interface';

export default  (userRepository: InDataBaseUserRepository) => ({

    Excute: async(
        idUser: string,
        fullName: string,
        email: string,
        aboutMe = 'Hello!',
        status = 'I am available',
        userName: string,
        idUserFromToken: string
    ) => {

        if(idUser !== idUserFromToken)throw new ApplicationException(`You don't Have access to this Route!`, 400);

        const entry = {idUser, fullName, email, aboutMe, status, userName};  
        Object.entries(entry).forEach( ([key, value]) => {
            if(value == null || value == undefined || value == ""){
                throw new ApplicationException(`The data is necessary: ${key}`, 400);
            }
        });

        const findByIdUser: any = await userRepository.findById(idUser);
        if(!findByIdUser.data[0]) {
            throw new ApplicationException('The User Does Not Exist.', 400);
        }
        const oldUser = new User(
            findByIdUser.data[0].idUser,
            findByIdUser.data[0].fullName,
            findByIdUser.data[0].email,
            findByIdUser.data[0].aboutMe,
            findByIdUser.data[0].status,
            findByIdUser.data[0].userName,
            findByIdUser.data[0].imageName,
            findByIdUser.data[0].urlImage,
            findByIdUser.data[0].idWallpaper,
            findByIdUser.data[0].urlWallpaper,
            findByIdUser.data[0].password,
            findByIdUser.data[0].createDate,
            findByIdUser.data[0].role,
            findByIdUser.data[0].active,
        );

        if(userName != oldUser.userName){
            const finByUserName: DatabaseResponseInterface = await userRepository.findByUserName(userName);
            if(finByUserName.data[0])  throw new ApplicationException('UserName already exist', 400);
            if(userName.length < 3)  throw new ApplicationException('The User Name must have more than 3 characters', 400);            
        }        
        
        const haveOnlyLetters = OnlyLetterInText(fullName);
        if(!haveOnlyLetters && fullName.length < 3) throw new ApplicationException('The Full Name must have more than 3 characters', 400);

        const isAValidEmail = IsAValidEmail(email);
        if(!isAValidEmail) throw new ApplicationException('The Email is Invalid', 400);

        oldUser.fullName = fullName;
        oldUser.email = email;
        oldUser.aboutMe = aboutMe;
        oldUser.status = status;
        oldUser.userName = userName;
        
        await userRepository.updateBasic(oldUser);

        const result =  await userRepository.findById(idUser);
            
        return result;
        
    }
});