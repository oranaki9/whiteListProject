import { Utils } from './../shared/utils';
import { fileModel } from './../models/file';
import { Response, Request } from "express"
export class WhiteList {

  constructor() { }
  addFile = (req: Request, res: Response) => {
    if (!req.body.newFile) {
      res.status(400).json(Utils.createErrorResponse("Fail to add file."));
      return;
    }
    const newFile = new fileModel(req.body.newFile);
    newFile.save().then((result) => {
      res.status(201).json(Utils.createSuccessResponse(newFile));
    }).catch(err => {
      res.status(400).json(Utils.createErrorResponse("Fail to add file."));
    })
  }
  getFiles = (req: Request, res: Response) => {
    fileModel.find().then((files: File[]) => {
      res.status(200).json(Utils.createSuccessResponse(files));
    }).catch((err) => {
      res.status(200).json(Utils.createErrorResponse("Files not found"));
    })
  }
}
