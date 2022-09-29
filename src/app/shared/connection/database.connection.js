import mongoose from "mongoose";
import { databaseConfig } from "../../../../config/database.config";


export async function databaseConnection() {
    try {

        if (!databaseConfig())
            throw new Error("Please Provide Database connection string")

        await mongoose.connect(databaseConfig());

        console.log('Database Connected successfully')
    } catch (DatabaseConnectionException) {
        console.log(DatabaseConnectionException)
        /**
         * Logger will appear
         */
    }
}
