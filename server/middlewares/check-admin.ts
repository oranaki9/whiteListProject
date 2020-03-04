import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Utils } from '../shared/utils';
export function checkAdmin(req: Request, res: Response, next: NextFunction): void {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken: any = jwt.verify(token, "THIS_SHOULD_BE_A LONGER_SECRET");
        if (decodedToken.role === 'admin') {
            next();
        } else {
            res.status(401).json(Utils.createErrorResponse("Not auth"));
        }
    } catch{
        res.status(401).json(Utils.createErrorResponse("Not auth"));
    }
}