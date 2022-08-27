import { Router } from 'express';
import { ProjectDependeciesTypes }  from '../../../frameworks/common/types/Types';

// Routes
import UserRoutes from './user/user.routes';
import MyFriendRoutes from './myFriends/myFriends.routes';
import ConversastionRoutes from './conversation/conversation.routes';
import MessageRoutes from './message/message.routes';

export default (dependecies: ProjectDependeciesTypes) => {
    const routes: Router = Router();
    
    routes.use('/user', UserRoutes(dependecies));
    routes.use('/myFriends', MyFriendRoutes(dependecies));
    routes.use('/conversation', ConversastionRoutes(dependecies));
    routes.use('/message', MessageRoutes(dependecies));    

    return routes;
};
