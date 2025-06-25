const mongoose = require('mongoose');

//define a schema
const quesSchema = mongoose.Schema({
    Title : {
        type : String,
        required : true,
        unique : true
    },
    Description : {
        type : String,
        required : true,
        unique : true
    },
    Constraints : {
        type : [String],
        required : true
    },
    TestCases : [
        {
            input : {type : String,required : true},
            output : {type : String,required : true}
        }
    ],
   
});

const Ques = mongoose.model('question',quesSchema);
module.exports = Ques;