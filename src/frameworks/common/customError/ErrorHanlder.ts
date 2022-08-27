
import { Request, Response, NextFunction} from 'express';
import { ApplicationException } from '../exceptions/applicationException';
import { Winston } from '../logConfig/winston';

export default(err: Error, req: Request, res: Response, next: NextFunction) => {

    if(err instanceof ApplicationException){
        return res.status(err.status).json({
            ok: false,
            message: err.message
        });
    }

    Winston.error(err.message);

    
    res.status(500).json({
        ok: false,
        message: 'Contact the Administrator'
    });
};
