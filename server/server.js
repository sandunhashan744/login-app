import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connect.js";    //db_connection
import router from "./routers/route.js";        //get_routers

// import dotenv from 'dotenv'
// import { config } from "dotenv";
// dotenv(config)

const app = express();

// middelware
app.use(cors());
app.use(express.json());
app.use(morgan());
app.disable('x-powered-by');

const PORT = process.env.PORT || 8080;

app.use('/api', router)
 

connect().then(() =>{
    try {
        app.listen(PORT, () => {
            console.log(`Server connected to http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log('can not connect to the database')        
    }
}
).catch(error => {
    console.log('Invalid connection...!')
})

