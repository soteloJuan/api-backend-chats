import { Request, Response, NextFunction } from 'express';

import { ProjectDependeciesTypes } from '../frameworks/common/types/Types';

// UsesCases
import UserCases from '../application/userCases/conversation';

// interfaces
import { DatabaseResponseInterface } from '../frameworks/common/interfaces/DatabaseResponse.interface';


export default (dependecies: ProjectDependeciesTypes) => {

    const conversationRepository = dependecies.inMemoryDataBasesService.conversationRepository;
    const userRepository = dependecies.inMemoryDataBasesService.userRepository;

    const Create = (req: Request, res: Response, next: NextFunction) => {
        
        const  {idUserOne, idUserTwo} = req.body;

        const createMessage = UserCases.CreateConversation(conversationRepository, userRepository);

        createMessage.Excute(idUserOne, idUserTwo).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const GetByIdConversation = (req: Request, res: Response, next: NextFunction) => {
        
        const  { idConversation } = req.params;

        const getByIdConversastion = UserCases.GetByIdConversastion(conversationRepository);

        getByIdConversastion.Excute( idConversation ).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const GetByUserOneAndUserTwo = (req: Request, res: Response, next: NextFunction) => {
        
        const  { idUserOne, idUserTwo } = req.body;

        const getByUserOneAndUserTwo = UserCases.GetByUserOneAndUserTwo(conversationRepository);

        getByUserOneAndUserTwo.Excute(idUserOne, idUserTwo).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const GetAllByUserOneTwo = (req: Request, res: Response, next: NextFunction) => {
        
        const  { idUserOneTwo } = req.params;

        const getAllByUserOneTwo = UserCases.GetAllByUserOneTwo(conversationRepository);

        getAllByUserOneTwo.Excute( idUserOneTwo ).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const GetByUserOneUserTwo = (req: Request, res: Response, next: NextFunction) => {
        
        const  { idUserOne, idUserTwo } = req.params;

        const getByUserOneUserTwo = UserCases.GetByUserOneUserTwo(conversationRepository, userRepository);

        getByUserOneUserTwo.Excute(idUserOne, idUserTwo).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const DeleteIdConversation = (req: Request, res: Response, next: NextFunction) => {
        
        const  { idConversation } = req.params;

        const deleteByIdConversation = UserCases.DeleteByIdConversation(conversationRepository);

        deleteByIdConversation.Excute( idConversation ).then( (result: DatabaseResponseInterface) => {

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
        GetByIdConversation,
        GetByUserOneAndUserTwo,
        GetAllByUserOneTwo,
        GetByUserOneUserTwo,
        DeleteIdConversation
    };
};