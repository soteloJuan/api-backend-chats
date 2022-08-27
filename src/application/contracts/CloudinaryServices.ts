import { ResponseCloudinaryTypes } from '../../frameworks/common/types/Types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary');


export class CloudinaryServices{
    constructor(){
        cloudinary.config({
            cloud_name: process.env.cloudinary_NAME as string,
            api_key: process.env.cloudinary_API_KEY as string,
            api_secret: process.env.cloudinary_API_SECRET as string
        });
    }

    async uploadImage(ImagePath: string): Promise<ResponseCloudinaryTypes>{

        const responseCloudinary: any = await cloudinary.v2.uploader.upload(ImagePath);

        const result: ResponseCloudinaryTypes = {
            idImage: responseCloudinary.public_id,
            urlImage: responseCloudinary.url
        };

        return result;
    }

    async deleteImage(idImage: string): Promise<any>{
        const resultadoCloudinary = await cloudinary.v2.uploader.destroy(idImage);
        return resultadoCloudinary;
    }

}