import { Router } from 'express';
import MyFriendsControllers from '../../../../controllers/myFriendsController';

import { ProjectDependeciesTypes }  from '../../../../frameworks/common/types/Types';

import ValidationJWT  from '../../middlewares/validationJWT';

export default ( dependecies: ProjectDependeciesTypes ) => {

    const router: Router = Router();
    const myFriendsControllers = MyFriendsControllers(dependecies);
    const validationJWT = ValidationJWT(dependecies);

    router.post('/create', validationJWT.validationJwtUser, myFriendsControllers.Create);
    router.get('/getByIdMyFriends/:idUser/:idMyFriends', validationJWT.validationJwtUser, myFriendsControllers.GetByIdMyFriends);
    router.get('/getAllByIdUser/:idUser', validationJWT.validationJwtUser, myFriendsControllers.GetAllByIdUser);
    router.delete('/deleteByIdMyFriends/:idUser/:idMyFriends', validationJWT.validationJwtUser, myFriendsControllers.DeleteByIdMyFriends);
    router.delete('/deleteByIdUserAndIdMyFriend/:idUser/:idFriend', validationJWT.validationJwtUser, myFriendsControllers.DeleteByIdUserAndIdFriend);

    return router;

};
