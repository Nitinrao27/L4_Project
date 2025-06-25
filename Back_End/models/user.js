const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    UserName :{
        type : String,
        required : true,
    },
    Email : {
        type : String,
        required : true,
        uinque : true
    },
    Password : {
        type : String,
        required : true
    }




},{
    timestamps : true
});

const User = mongoose.model('user',userSchema);
module.exports = User;