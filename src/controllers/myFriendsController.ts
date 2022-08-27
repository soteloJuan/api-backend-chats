import { Request, Response, NextFunction } from 'express';

import { ProjectDependeciesTypes } from '../frameworks/common/types/Types';

// UsesCases
import UserCases from '../application/userCases/myFriends';

// interfaces
import { DatabaseResponseInterface } from '../frameworks/common/interfaces/DatabaseResponse.interface';


export default (dependecies: ProjectDependeciesTypes) => {

    const userRepository = dependecies.inMemoryDataBasesService.userRepository;
    const myFriendsRepository = dependecies.inMemoryDataBasesService.myFriendsRepository;

    const Create = (req: Request, res: Response, next: NextFunction) => {
        
        const  {idUser, idFriend, idUserFromToken} = req.body;
        
        const createMyFriends = UserCases.CreateMyFriends(myFriendsRepository, userRepository);

        createMyFriends.Excute(idUser, idFriend, idUserFromToken).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const GetByIdMyFriends = (req: Request, res: Response, next: NextFunction) => {

        const  {idUser, idMyFriends} = req.params;
        const  { idUserFromToken } = req.body;

        const getByIdMyFriends = UserCases.GetByIdMyFriends(myFriendsRepository);

        getByIdMyFriends.Excute(idUser, idUserFromToken, idMyFriends).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const GetAllByIdUser = (req: Request, res: Response, next: NextFunction) => {

        const  { idUser } = req.params;
        const  { idUserFromToken } = req.body;


        const getAllByIdUser = UserCases.GetAllByIdUser(myFriendsRepository);

        getAllByIdUser.Excute(idUser, idUserFromToken).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const DeleteByIdMyFriends = (req: Request, res: Response, next: NextFunction) => {

        const  {idUser, idMyFriends} = req.params;
        const  { idUserFromToken } = req.body;

        const deleteByIdMyFriends = UserCases.DeleteByIdMyFriends(myFriendsRepository);

        deleteByIdMyFriends.Excute(idUser, idMyFriends, idUserFromToken).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const DeleteByIdUserAndIdFriend = (req: Request, res: Response, next: NextFunction) => {

        const  {idUser, idFriend} = req.params;
        const  { idUserFromToken } = req.body;

        const deleteByIdUserAndIdFriend = UserCases.DeleteByIdUserAndIdFriend(myFriendsRepository);

        deleteByIdUserAndIdFriend.Excute(idUser, idFriend, idUserFromToken).then( (result: DatabaseResponseInterface) => {

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
        Create,
        GetByIdMyFriends,
        GetAllByIdUser,
        DeleteByIdMyFriends,
        DeleteByIdUserAndIdFriend
    };
};