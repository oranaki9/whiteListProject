import { mongoInstance } from './../database/mongoose-connection';
import { Schema, Model } from "mongoose";
import * as mongoose from "mongoose";
export const FILE_MODEL_NAME = "File"
export interface IFile {
    signature: { hash: string };
    name: string
    path: string;
    type: string;
}


export const fileSchema: Schema<IFile> = new mongoose.Schema({
    signature: { type: Object, required: true },
    path: { type: String, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true }
})
export const fileModel: Model<any> = mongoInstance.connection.model<any>(FILE_MODEL_NAME, fileSchema);