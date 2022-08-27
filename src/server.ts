import 'dotenv/config';

import  ProjectDependecies  from './config/projectDependecies';
import App from './app';

ProjectDependecies.inMemoryDataBasesService.initDatabases().then( () => {
    const app = new App(ProjectDependecies);
    app.init();
})
.catch( () => { 
    throw new Error('Database Initialization Error');
});