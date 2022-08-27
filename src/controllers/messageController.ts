import { Request, Response, NextFunction } from 'express';

import { ProjectDependeciesTypes } from '../frameworks/common/types/Types';

// UsesCases
import UserCases from '../application/userCases/message';

// interfaces
import { DatabaseResponseInterface } from '../frameworks/common/interfaces/DatabaseResponse.interface';

export default (dependecies: ProjectDependeciesTypes) => {

    const messageRepository = dependecies.inMemoryDataBasesService.messageRepositor;
    const userRepository = dependecies.inMemoryDataBasesService.userRepository;
    const conversationRepository = dependecies.inMemoryDataBasesService.conversationRepository;
    const socketService = dependecies.notifySocketService;

    const Create = (req: Request, res: Response, next: NextFunction) => {
        
        const { idUser } = req.params;
        const  {idConversation, body} = req.body;

        const createMessage = UserCases.CreateMessage(messageRepository, userRepository, conversationRepository, socketService);

        createMessage.Excute(idUser, body, idConversation).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const GetByIdMessage = (req: Request, res: Response, next: NextFunction) => {

        const  {idMessage} = req.params;

        const getByIdMessage = UserCases.GetByIdMessage(messageRepository);

        getByIdMessage.Excute(idMessage).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const GetByIdUserAndIdConversation = (req: Request, res: Response, next: NextFunction) => {

        const { idUser } = req.params;
        const { idConversation } = req.body;

        const getByIdUserAndIdConversation = UserCases.GetByIdUserAndIdConversation(messageRepository, userRepository, conversationRepository);

        getByIdUserAndIdConversation.Excute(idUser, idConversation).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const GetLastTenMessageByIdConversation = (req: Request, res: Response, next: NextFunction) => {

        const  { idConversation, numberPage} = req.params;
        const number: number = parseInt(numberPage);

        const getLastTenMessageByIdConversation = UserCases.GetLastTenMessageByIdConversation(messageRepository);
        getLastTenMessageByIdConversation.Excute(idConversation, number).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const GetLastMessageByIdConversation = (req: Request, res: Response, next: NextFunction) => {

        const { idConversation } = req.params;

        const getLastMessageByIdConversation = UserCases.GetLastMessageByIdConversation(messageRepository);

        getLastMessageByIdConversation.Excute(idConversation).then( (result: DatabaseResponseInterface) => {

            res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data
            });

        }).catch((error) =>{
            next(error);
        });
    };

    const DeleteByIdMessage = (req: Request, res: Response, next: NextFunction) => {

        const  { idMessage } = req.params;

        const deleteByIdMessage = UserCases.DeleteByIdMessage(messageRepository);

        deleteByIdMessage.Excute(idMessage).then( (result: DatabaseResponseInterface) => {

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
        GetByIdMessage,
        GetByIdUserAndIdConversation,
        GetLastTenMessageByIdConversation,
        GetLastMessageByIdConversation,
        DeleteByIdMessage
    };
};
