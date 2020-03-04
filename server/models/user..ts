import { mongoInstance } from './../database/mongoose-connection';
import * as mongoose from "mongoose";
import { User } from "../../shared/interfaces/users";
import { Schema, Model, Document } from "mongoose";

export const USER_COLLECTION_NAME = "User";
export interface IUser extends User, Document { }

export const userSchema: Schema<IUser> = new mongoose.Schema({
    userName: { type: String, unique: true, required: true, index: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
})
export const userModel: Model<IUser> = mongoInstance.connection.model<IUser>(USER_COLLECTION_NAME, userSchema);