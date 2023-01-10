import mongoose from "mongoose";
import ENV from '../config.js'

//const MONGO_URL= `mongodb+srv://sadun:ZcLrlIzTBvkx9mPI@cluster0.nabso2n.mongodb.net/userLogin?retryWrites=true&w=majority`

async function connect(){
    mongoose.set('strictQuery', true)
    const db = await mongoose.connect(ENV.MONGO_URL)
    console.log('Database Connected...!')
    return db;
}
export default connect;