const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const UserSchema = new Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
});

//connect schema to model
mongoose.model('users', UserSchema);