import { InMemoryDataBasesService } from '../../persistance/inMemoryDatabasesService';
import { ImageCloudinaryService } from '../../externalService/ImageCloudinaryService';
import { NotifySocketService } from '../../externalService/NotifySocketService';


export type ProjectDependeciesTypes = {
    inMemoryDataBasesService : InMemoryDataBasesService,
    imageCloudinaryService: ImageCloudinaryService,
    notifySocketService: NotifySocketService
}

export type ResponseCloudinaryTypes = {

    idImage: string,
    urlImage: string

}