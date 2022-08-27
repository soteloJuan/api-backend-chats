import { Request, Response, NextFunction } from 'express';

import { ProjectDependeciesTypes } from '../frameworks/common/types/Types';

// UsesCases
import UserCases from '../application/userCases/user';

// interfaces
import { DatabaseResponseInterface } from '../frameworks/common/interfaces/DatabaseResponse.interface';


export default (dependecies: ProjectDependeciesTypes) => {

    const userRepository = dependecies.inMemoryDataBasesService.userRepository;
    const imageCloudinaryService = dependecies.imageCloudinaryService;

    const Login = (req: Request, res: Response, next: NextFunction) => {
        
        const  { userName, password } = req.body;
        const loginUser = UserCases.LoginUser(userRepository);
        loginUser.Excute(userName, password).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data,
                token: result.token
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const RenewToken = (req: Request, res: Response, next: NextFunction) => {
        
        const  { idUserFromToken } = req.body;
        const renewToken = UserCases.RenewTokenUser(userRepository);
        renewToken.Excute( idUserFromToken ).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data,
                token: result.token
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const Create = (req: Request, res: Response, next: NextFunction) => {
        
        const  {fullName, email, aboutMe, status, userName, password} = req.body;
        const createUser = UserCases.CreateUser(userRepository);
        createUser.Excute(fullName, email, aboutMe, status, userName, password).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const GetById = (req: Request, res: Response, next: NextFunction) => {
        
        const  {idUser} = req.params;
        const getByIdUser  = UserCases.GetByIdUser(userRepository);

        getByIdUser.Excute(idUser).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const GetByUserNameLike = (req: Request, res: Response, next: NextFunction) => {
        
        const  {userName} = req.params;
        const getByUserNameLike  = UserCases.GetByUserNameLike(userRepository);

        getByUserNameLike.Excute(userName).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };
    
    const UpdateBasic = (req: Request, res: Response, next: NextFunction) => {
        
        const {idUser} = req.params;
        const  {fullName, email, aboutMe, status, userName, idUserFromToken } = req.body;
        const updateBasic = UserCases.UpdateBasic(userRepository);

        updateBasic.Excute(idUser, fullName, email, aboutMe, status, userName, idUserFromToken).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const UpdatePassword = (req: Request, res: Response, next: NextFunction) => {
        
        const {idUser} = req.params;
        const  { password, idUserFromToken } = req.body;
        const updateBasic = UserCases.UpdatePassword(userRepository);

        updateBasic.Excute(idUser, password, idUserFromToken).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const UpdateImage = (req: Request, res: Response, next: NextFunction) => {
        
        const {idUser} = req.params;
        const path  = req.file?.path;
        const  { idUserFromToken } = req.body;  

        const uploadImage = UserCases.UploadImage(userRepository, imageCloudinaryService);

        uploadImage.Excute(idUser, path, idUserFromToken).then( (result: DatabaseResponseInterface ) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });
        }).catch((error) =>{
            next(error);
        });
    };

    const UpdateImageWallpaper = (req: Request, res: Response, next: NextFunction) => {
        
        const {idUser} = req.params;
        const path  = req.file?.path;
        const  { idUserFromToken } = req.body;  

        const uploadWallpaper = UserCases.UploadWallpaper(userRepository, imageCloudinaryService);

        uploadWallpaper.Excute(idUser, path, idUserFromToken).then( (result: DatabaseResponseInterface ) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const DeleteUser = (req: Request, res: Response, next: NextFunction) => {
        
        const {idUser} = req.params;
        const  { idUserFromToken } = req.body;


        const deleteUser = UserCases.DeleteUser(userRepository, imageCloudinaryService);

        deleteUser.Excute(idUser, idUserFromToken).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const DeleteImage = (req: Request, res: Response, next: NextFunction) => {
        
        const {idUser} = req.params;
        const  { idUserFromToken } = req.body;
        const deleteImage = UserCases.DeleteImage(userRepository, imageCloudinaryService);

        deleteImage.Excute(idUser, idUserFromToken).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };


    const DeleteWallpaper = (req: Request, res: Response, next: NextFunction) => {
        
        const {idUser} = req.params;
        const  { idUserFromToken } = req.body;
        const deleteWallpaper = UserCases.DeleteWallpaper(userRepository, imageCloudinaryService);

        deleteWallpaper.Excute(idUser, idUserFromToken).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    return {
        Login,
        RenewToken,
        Create,
        GetById,
        GetByUserNameLike,
        UpdateBasic,
        UpdatePassword,
        UpdateImage,
        UpdateImageWallpaper,
        DeleteUser,
        DeleteImage,
        DeleteWallpaper
    };

};

