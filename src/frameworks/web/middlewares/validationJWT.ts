import jwt, { JwtPayload }  from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ProjectDependeciesTypes } from '../../common/types/Types';


export default (dependecies: ProjectDependeciesTypes) => ({
    validationJwtUser: async(req: Request, res: Response, next: NextFunction): Promise<any> => {
        try{

            const token = req.header('token') || "";

            if(token?.length === 0 || token.trim() == "" || token === undefined || token === null) {
                return res.status(401).json({
                    ok:false,
                    message:'The Token Is Required!',
                    data:[]
                });
            }
    
            const privateKey = process.env.SECRETORPRIVATEKEY || 'helloworld';
            const { payload } = jwt.verify(token, privateKey) as JwtPayload;
            const userRepository =  dependecies.inMemoryDataBasesService.userRepository;

            const resultFindUser:any = await  userRepository.findById(payload);
            if(!resultFindUser.data[0]) {
                return res.status(401).json({
                    ok:false,
                    message:'The UserName Does Not Exist!',
                    data:[]
                });
            }
            req.body.idUserFromToken = payload;
            next();
        }catch(error){
            return res.status(401).json({
                ok:false,
                message:'Token Validation Failed!',
                data:[]
            });
        }
    }
});