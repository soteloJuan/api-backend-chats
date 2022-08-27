import { Router } from 'express';
import ConversationController from '../../../../controllers/conversationController';

import { ProjectDependeciesTypes }  from '../../../../frameworks/common/types/Types';

import ValidationJWT  from '../../middlewares/validationJWT';

export default ( dependecies: ProjectDependeciesTypes ) => {

    const router: Router = Router();
    const conversationController = ConversationController(dependecies);
    const validationJWT = ValidationJWT(dependecies);

    router.post('/createConversation', validationJWT.validationJwtUser, conversationController.Create);
    router.get('/getByIdConversation/:idConversation', validationJWT.validationJwtUser, conversationController.GetByIdConversation);
    router.get('/getByUserOneAndUserTwo', validationJWT.validationJwtUser, conversationController.GetByUserOneAndUserTwo);
    router.get('/getAllByUserOneTwo/:idUserOneTwo', validationJWT.validationJwtUser, conversationController.GetAllByUserOneTwo);
    router.get('/getByUserOneUserTwo/:idUserOne/:idUserTwo', validationJWT.validationJwtUser, conversationController.GetByUserOneUserTwo);
    router.delete('/deleteByIdConversation/:idConversation', validationJWT.validationJwtUser, conversationController.DeleteIdConversation);

    return router;

};
