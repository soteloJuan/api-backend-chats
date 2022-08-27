import cors from 'cors';
import express,{ Application } from 'express';
import morgan from 'morgan';
import { Server } from 'http';

// Routes
import Routes from './frameworks/web/routes';

// Types
import { ProjectDependeciesTypes } from './frameworks/common/types/Types';

// Error custom
import ErrorHandler from './frameworks/common/customError/ErrorHanlder';

export default class App{
    app: Application;
    port: string|number;
    server!: Server;
    projectDependecies!: ProjectDependeciesTypes;

    constructor(projectDependecies: ProjectDependeciesTypes){
        this.projectDependecies = projectDependecies;
        this.port = process.env.PORT  || 300;
        this.app = express();
        this.server = projectDependecies.notifySocketService.initSocket(this.app);
        this.middlewares();
        this.routes();
    }
    
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }
    
    routes(){
        this.app.use('/api', Routes(this.projectDependecies));
        this.app.use(ErrorHandler);
    }

    init(){
        this.server.listen(this.port);
    }

}
