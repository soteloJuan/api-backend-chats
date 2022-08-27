import { Request } from 'express';
import { nanoid } from 'nanoid';
import multer from 'multer';
import path from 'path';

const Storage = multer.diskStorage({
    destination: path.join(__dirname, '../../common/assets'),
    filename:(req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const fileFilterIMG = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {

    const tipoExtension: string = path.extname(file.originalname);
    const extensionsArray = ['.png', '.jng', '.jpeg', '.gif', '.jpg'];

    const haveExtension = extensionsArray.includes(tipoExtension);
    
    if(!haveExtension){
        
        return cb(null, false);
    }

    return cb(null, true);
};

export const uploadImagen = multer({storage:Storage, fileFilter: fileFilterIMG});
