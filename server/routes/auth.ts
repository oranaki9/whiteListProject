import { IUser, userModel } from './../models/user.';
import { Encryption } from './../hash/encryption';
import { EncryptedData } from './../hash/encrypted-data.model';
import { Utils } from './../shared/utils';
import { UserLogin, User } from './../../shared/interfaces/users';
import { Response, Request } from "express";
import * as jwt from "jsonwebtoken";
export class Auth {
    constructor() {

    }

    public login = async (req: Request, res: Response) => {
        const user: UserLogin = req.body.user;
        const isValid: boolean = this.validateUser(user);
        if (!isValid) {
            res.status(400).json(Utils.createErrorResponse("Fileds are empty."));
            return;
        }

        const encryptedData: EncryptedData | Error = Encryption.encrypt(user.password);

        if (encryptedData instanceof Error) {
            res.status(400).json(Utils.createErrorResponse("Encryption failed."));
            return;
        }
        const password: string = encryptedData.hash.toString();
        let mongoUser: User;
        const userData: IUser[] = await userModel.find({ userName: user.userName });
        mongoUser = userData[0];

        if (userData.length === 0) {
            res.status(404).json(Utils.createErrorResponse("User not found"));
            return;
        }

        if (password !== mongoUser.password) {
            res.status(404).json(Utils.createErrorResponse("Auth Failed"));
            return;
        }
        //generate jwt token
        const token = jwt.sign({ userName: mongoUser.userName, role: mongoUser.role }, "THIS_SHOULD_BE_A LONGER_SECRET");
        res.status(200).json(Utils.createSuccessResponse(token));
        return;
    }
    public getUserRole = (req: Request, res: Response) => {
        const token: string = req.headers.authorization.split(" ")[1];
        try {
            const decodedToken: any = jwt.verify(token, "THIS_SHOULD_BE_A LONGER_SECRET");
            res.status(200).json(Utils.createSuccessResponse(decodedToken.role));
        }
        catch{
            res.status(404).json(Utils.createErrorResponse("user role not found"));

        }
    }
    private validateUser = (user: UserLogin): boolean => {
        if (!user.userName || !user.password) {
            return false;
        }
        return true;
    }
}
