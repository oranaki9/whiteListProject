import { Utils } from './../shared/utils';
import { Request, Response } from 'express';
import { NextFunction } from 'connect';
import * as jwt from "jsonwebtoken";
export function checkAuth(req: Request, res: Response, next: NextFunction) {

    try {
        const token: any = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "THIS_SHOULD_BE_A LONGER_SECRET");
        next();
    } catch{
        res.status(401).json(Utils.createErrorResponse("Not auth"));
    }

}
