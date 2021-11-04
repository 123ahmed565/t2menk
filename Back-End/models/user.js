const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
   
    phone: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["Property Insurance","life Insurance","travel Insurance's","car Insurance","medical Insurance"]
    },
    message: {
        type: String,
        required: true,
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
