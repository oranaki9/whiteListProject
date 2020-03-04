import { Encryption } from './hash/encryption';
import * as express from "express";
import { Routes } from './routes';
import * as bodyParser from "body-parser";
import * as path from "path";
import * as fs from "fs";
//import { mongoInstance } from "./database/mongoose-connection";
class App {
    public app: express.Application;
    public server: any;
    private routes: Routes;
    constructor() {
        this.app = express();
        this.setCors();
        this.setServer();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.routes = new Routes();
        this.app.all("/*", this.routes.router);
        this.setUploadFolder();
        Encryption.encrypt("fileName");
    }
    setUploadFolder() {
        const logsDir: string = path.join(__dirname, 'uploads');
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir)
        }
    }
    setServer() {
        this.app.set("port", process.env.PORT || "3030");
        this.server = this.app.listen(this.app.get("port"), () => {
            console.log('Express server listening on port ' + this.app.get('port'));

        })
    }
    setCors() {
        // allows all origins!
        this.app.use((req: express.Request, res: express.Response, next: Function) => {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', '*');
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            // Pass to next layer of middleware
            next();
        });
    }
}
export default new App().app;