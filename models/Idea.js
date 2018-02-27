const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const IdeaSchema = new Schema({
    title : {
        type: String,
        required : true
    },
    details : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
});

//connect schema to model
mongoose.model('ideas', IdeaSchema);