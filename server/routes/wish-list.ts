import { Utils } from './../shared/utils';
import { fileModel, IFile } from './../models/file';
import { Response, Request } from "express"
import * as fs from "fs"
export class WhiteList {

  constructor() { }
  public addFile = (req: Request, res: Response) => {
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
  public getFiles = (req: Request, res: Response) => {
    fileModel.find().then((files: File[]) => {
      res.status(200).json(Utils.createSuccessResponse(files));
    }).catch((err) => {
      res.status(200).json(Utils.createErrorResponse("Files not found"));
    })
  }
  public getFile = (req: Request, res: Response) => {
    if (!req.params.fileName) {
      res.status(200).json(Utils.createErrorResponse("No file name provided"));
      return;
    }
    const filePath = "../server/uploads/" + req.params.fileName;
    fs.readFile(filePath, "utf-8", (err: NodeJS.ErrnoException, data: Buffer) => {
      res.status(200).json(Utils.createSuccessResponse(data));

    });

  }
}
