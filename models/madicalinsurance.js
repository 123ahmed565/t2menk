const mongoose = require('mongoose');
const validator = require("validator");

const madicalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

   
    phone: {
        type: String,
        required: [true, "You must have a phone"],
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])) throw new Error('egyption mobile needed')
        }  
    },
    numberofemployee: {
        type: Number,
    },
   

    type: {
        type: String,
        required: [true," dif type"],
        enum: ["medical Insurance individual","medical Insurance company"]
    },
    email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    ownerage: {
        type: String,
        required: true,
    },

   
  faceImg: String,
  backImg: String,


    
    
    
    
  

});

carSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

carSchema.set('toJSON', {
    virtuals: true,
});

exports.Car = mongoose.model('Car', carSchema);
exports.carSchema = carSchema;
