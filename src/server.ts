import App from 'app';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import IncomeWorker from "./workers/IncomeWorker";

dotenv.config();

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || "bank-data";
const DATABASE_PORT = parseInt(process.env.DATABASE_PORT!) || 27017;
const MONGO_DATABASE = process.env.MONGO_INITDB_DATABASE || "bankDb";
const MONGO_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME || "root";
const MONGO_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD || "root";
const MONGO_DB_ADMIN = "admin";

(async () => {
    try {

        await mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${DATABASE_URL}:${DATABASE_PORT}/${MONGO_DB_ADMIN}?authSource=${MONGO_DB_ADMIN}&w=1&authMechanism=SCRAM-SHA-256`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            auth: {
                user: MONGO_USERNAME,
                password: MONGO_PASSWORD
            }
        });

        console.log('Connection has been established successfully.');
        const app = new App().app;
        app.listen(PORT, () => {
            console.log(`SERVER ON at ${PORT}`);
        });

        const worker = new IncomeWorker();
        const rule = worker.BuildDefaultRecurrenceRule();
        worker.Schedule(rule);

    }
    catch (error) {
        console.log(error);
    }
})();
