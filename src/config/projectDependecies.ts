/* Aqui van todas las dependecias que se requiere para que lo demas funciones normal */
import { InMemoryDataBasesService }  from '../frameworks/persistance/inMemoryDatabasesService';
import { ImageCloudinaryService } from '../frameworks/externalService/ImageCloudinaryService';
import { NotifySocketService } from '../frameworks/externalService/NotifySocketService';

// Types
import { ProjectDependeciesTypes } from '../frameworks/common/types/Types';


export default ((): ProjectDependeciesTypes => {
    return {
        inMemoryDataBasesService : new InMemoryDataBasesService(),
        imageCloudinaryService: new ImageCloudinaryService(),
        notifySocketService: new NotifySocketService()
    };
})();



