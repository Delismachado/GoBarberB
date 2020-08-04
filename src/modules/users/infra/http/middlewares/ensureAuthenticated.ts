import { Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';


interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated (
    request: Request,
    response: Response,
    Next: NextFunction,
): void{
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError('TWT token is missing.', 401)
    }

    const [ , token] = authHeader.split(' ');

    try{
        const decoded = verify(token, authConfig.jwt.secret);
        //console.log(decoded);
        const {sub} = decoded as TokenPayload;

        request.user = {
            id: sub,
        };

        return Next();        
    } catch{
        throw new AppError('Ivalid JWT token ', 401);
    }
}