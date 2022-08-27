import fsExtra from 'fs-extra';

import { ApplicationException } from '../../../frameworks/common/exceptions/applicationException';
import { InDataBaseUserRepository }  from '../../../frameworks/persistance/InDataBaseUserRepository';
import { ImageCloudinaryService } from '../../../frameworks/externalService/ImageCloudinaryService';

// Types

import { ResponseCloudinaryTypes } from '../../../frameworks/common/types/Types';

export default  (userRepository: InDataBaseUserRepository,  imageCloudinaryService:  ImageCloudinaryService) => ({

    Excute: async(
        idUser: string,
        pathImage = "",
        idUserFromToken: string
    ) => {

        if(idUser !== idUserFromToken)throw new ApplicationException(`You don't Have access to this Route!`, 400);

        Object.entries({idUser, pathImage}).forEach( ([key, value]) => {
            if(value == null || value == undefined || value == ""){
                throw new ApplicationException(`The data is necessary: ${key}`, 400);
            }
        });

        const findByIdUser: any = await userRepository.findById(idUser);
        if(!findByIdUser.data[0]) throw new ApplicationException('The User Does Not Exist.', 400);

        if(findByIdUser.data[0].idWallpaper) await imageCloudinaryService.deleteImage(findByIdUser.data[0].idWallpaper);

        const resultCloudinaryService: ResponseCloudinaryTypes = await imageCloudinaryService.uploadImage(pathImage);
        await fsExtra.unlink(pathImage);
        await userRepository.updateImageWallpaper(idUser, resultCloudinaryService.idImage, resultCloudinaryService.urlImage);
        
        const result  = await userRepository.findById(idUser);
        return result;

    }
});
