import { EncryptedData } from './encrypted-data.model';
import * as crypto from "crypto";
export class Encryption {

    static encrypt(data: any): EncryptedData | Error {
        if (data === " ") {
            return new Error("there was no data inserted");
        }
        const secret: string = "TrulyProtect";


        let hash: string = crypto.createHmac('sha256', secret).update(data).digest('hex');
        if (hash) {
            return {
                hash
            }
        } else {
            return new Error("an error has been occurred");
        }
    }
}