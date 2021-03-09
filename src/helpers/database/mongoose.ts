import { Mongoose } from "mongoose";

export default class MongooseDb {

    public mongoose: Mongoose;

    constructor() {
        this.mongoose = new Mongoose();
    }

    public connect = async (url: string, databaseName: string, port: number, username: string, password: string, ) => {
        this.mongoose.set('bufferCommands', false);
        console.log(`${username}:${password}@${databaseName}`);
        await this.mongoose.connect(`mongodb://${url}:${port}/bankDb`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });
    };

}