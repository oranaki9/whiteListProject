import { IFile, fileModel } from './../models/file';
import { Encryption } from './../hash/encryption';
import { WhiteList } from './wish-list';
import * as express from 'express';
import * as multer from 'multer';
import { Auth } from './auth';
import { checkAuth } from '../middlewares/check-auth';
import { EncryptedData } from '../hash/encrypted-data.model';
import { checkAdmin } from '../middlewares/check-admin';

export class Routes {
    private storage = multer.diskStorage({

        destination: async (req, file, callBack) => {
            let error: Error = new Error("Cannot save file.");
            const newFileHash: Error | EncryptedData = Encryption.encrypt(JSON.stringify(file));
            const url: string = req.protocol + "://" + req.get("host");
            const filePath: string = url + "/server/uploads/" + file.originalname;
            req.body.filePath = filePath;
            const savedFile: IFile[] = await fileModel.find({ path: filePath });

            const foundInDb = this.foundInDb(savedFile, newFileHash);
            const signatureMatch = this.signatureMatch(savedFile, newFileHash);

            if (!foundInDb || signatureMatch) {
                req.body.newFile = {
                    signature: newFileHash,
                    path: filePath,
                    type: file.mimetype,
                    name: file.originalname
                };

                error = null;

            }
            callBack(error, 'uploads')
        },
        filename: (req, file, callBack) => {
            callBack(null, `${file.originalname}`)
        },

    });
    private signatureMatch(files: IFile[], newFileHash: EncryptedData | Error): boolean {


        if (files.length) {
            if (JSON.stringify(newFileHash) === JSON.stringify(files[0].signature)) {
                return true;
            }
        }

        return false;
    }
    private foundInDb(files: IFile[], newFileHash: EncryptedData | Error): boolean {
        if (files.length === 0) {
            return false;
        }
        return true;
    }
    private upload = multer({ storage: this.storage })
    private _router = express.Router();
    public _whiteList = new WhiteList();
    public _auth = new Auth();
    constructor() {
        this.setWhiteListRoutes();
        this.setAuthRoutes();
    }
    get router() {
        return this._router;
    }

    setWhiteListRoutes() {
        this._router.post("/api/white-list", checkAdmin, this.upload.single("file"), this._whiteList.addFile);
        this._router.get("/api/white-list", checkAuth, this._whiteList.getFiles);
    }
    setAuthRoutes() {
        this._router.post("/log-in", this._auth.login);
        this._router.get("/user-access", this._auth.getUserRole);
    }

}
