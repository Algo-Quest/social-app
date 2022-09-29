import "dotenv/config";
import { commonConfig } from "./config";
import { ApiServer } from "./src/app/app";
import express from 'express';


(() => {
    new ApiServer(express()).listen(+process.env.SERVER_PORT)
})()