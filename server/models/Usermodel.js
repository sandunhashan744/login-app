import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please Provide a unique Name"],
        unique : [true, "User Name Exist"]
    },
    password : {
        type: String,
        required : [true, "Please Provide a Password"],
        unique : false
    },
    email : {
        type : String,
        required : [true, "Please Provide the Unique email"],
        unique : true
    },
    firstName : {type : String},
    lastName : {type : String},
    mobile : {type : String},
    address : {type : String},
    profile : {type : String}
});

export default mongoose.model.users || mongoose.model('users', UserSchema)
//Users