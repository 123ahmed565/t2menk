const mongoose = require('mongoose');
const validator = require("validator");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        maxlength: [50, "Name must not exceed 50 characters"],
        minlength: [2, "Name must not be less than 2 characters"],
        trim: true,
      
    },
    email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
   
    phone: {
        type: String,
        required: [true, "You must have a phone"],
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])) throw new Error('egyption mobile needed')
        }       },
    type: {
        type: String,
        required: [true," dif type"],
        enum: ["Property Insurance","life Insurance","travel Insurance's","car Insurance","medical Insurance individual","medical Insurance company","customer service"]
    },
    message: {
        type: String,
    },

    
    
    
    
  

});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;
