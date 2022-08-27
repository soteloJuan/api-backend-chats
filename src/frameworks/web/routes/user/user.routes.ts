import { Router } from 'express';
import UserController from '../../../../controllers/userController';

// Middlewares
import { uploadImagen } from '../../middlewares/multer-uploadImage';
import ValidationJWT  from '../../middlewares/validationJWT';

import { ProjectDependeciesTypes }  from '../../../../frameworks/common/types/Types';

export default ( dependecies: ProjectDependeciesTypes ) => {

    const router: Router = Router();
    const userController = UserController(dependecies);
    const validationJWT = ValidationJWT(dependecies);

    router.post('/login', userController.Login);
    router.get('/renew', validationJWT.validationJwtUser , userController.RenewToken);
    router.post('/create', userController.Create);
    router.get('/getById/:idUser', validationJWT.validationJwtUser, userController.GetById);
    router.get('/getByUserNameLike/:userName',  validationJWT.validationJwtUser,userController.GetByUserNameLike);

    router.put('/updateBasic/:idUser', validationJWT.validationJwtUser, userController.UpdateBasic);
    router.put('/updatePassword/:idUser', validationJWT.validationJwtUser, userController.UpdatePassword);

    router.put('/updateImage/:idUser', [ uploadImagen.single('image'), validationJWT.validationJwtUser ], userController.UpdateImage);

    router.put('/updateWallpaper/:idUser', [ uploadImagen.single('image'), validationJWT.validationJwtUser ], userController.UpdateImageWallpaper);

    router.delete('/deleteUser/:idUser', validationJWT.validationJwtUser, userController.DeleteUser);
    router.delete('/deleteImage/:idUser', validationJWT.validationJwtUser, userController.DeleteImage);
    router.delete('/deleteWallpaper/:idUser', validationJWT.validationJwtUser, userController.DeleteWallpaper);

    return router;

};
