import * as mongoose from "mongoose";
 class MongooseConnection {
    private _connection: mongoose.Connection;//xCz5q7u8XA6DLeGN
    private _db: string = "mongodb+srv://orAnaki:xCz5q7u8XA6DLeGN@cluster0-jhgbf.mongodb.net/test?retryWrites=true&w=majority";
    private mongooseOptions: mongoose.ConnectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };

    constructor() {
        this.connectToMongo();
    }
    get connection(): mongoose.Connection {
        return this._connection;
    }
    connectToMongo(): void {
        mongoose.connect(this._db,this.mongooseOptions);
        this._connection = mongoose.connection;
        this._connection.on('open', () =>
            console.log('Connected to Mongoose')
        );
        this._connection.on('error', () => {
            console.log('Mongoose error')
        })
    }
}
export const mongoInstance = new MongooseConnection();
