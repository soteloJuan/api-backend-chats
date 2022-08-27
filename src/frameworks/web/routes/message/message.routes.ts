import { Router } from 'express';
import MessageController from '../../../../controllers/messageController';

import { ProjectDependeciesTypes }  from '../../../../frameworks/common/types/Types';
import ValidationJWT  from '../../middlewares/validationJWT';


export default ( dependecies: ProjectDependeciesTypes ) => { // Faltan validaciones para poder obtener los mensajes y conversaciones que peternecen al usuario

    const router: Router = Router();
    const messageController = MessageController(dependecies);
    const validationJWT = ValidationJWT(dependecies);


    router.post('/create/:idUser', validationJWT.validationJwtUser, messageController.Create);
    router.get('/getByIdMessage/:idMessage', validationJWT.validationJwtUser, messageController.GetByIdMessage);
    router.get('/getByIdUserAndIdConversation/:idUser', validationJWT.validationJwtUser, messageController.GetByIdUserAndIdConversation);
    router.get('/lastTenMessage/:idConversation/:numberPage', validationJWT.validationJwtUser, messageController.GetLastTenMessageByIdConversation);
    router.get('/lastMessage/:idConversation', validationJWT.validationJwtUser, messageController.GetLastMessageByIdConversation);
    router.delete('/deleteByIdMessage/:idMessage', validationJWT.validationJwtUser, messageController.DeleteByIdMessage);


    return router;

};
