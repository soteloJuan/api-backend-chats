import { InDataBaseUserRepository }  from '../../../frameworks/persistance/InDataBaseUserRepository';
import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';
import { ImageCloudinaryService } from '../../../frameworks/externalService/ImageCloudinaryService';


export default  (userRepository: InDataBaseUserRepository,   imageCloudinaryService:  ImageCloudinaryService) => ({

    Excute: async(
        idUser: string,
        idUserFromToken: string
    ) => {
        
        if(idUser !== idUserFromToken)throw new ApplicationException(`You don't Have access to this Route!`, 400);

        if(!idUser) throw new ApplicationException('User ID is Required', 400);

        const findByIdUser: any = await userRepository.findById(idUser);
        if(!findByIdUser.data[0]) throw new ApplicationException('The User Does Not Exist.', 400);

        if(findByIdUser.data[0].idImage) await imageCloudinaryService.deleteImage(findByIdUser.data[0].idImage);

        const result = await userRepository.removeUser(idUser);
            
        return result;
        
    }
});