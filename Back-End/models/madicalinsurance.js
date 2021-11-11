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
    carbrand: {
        type: String,
        required: true,
    },
    carmodel: {
        type: String,
        required: true,
    },
    caryear: {
        type: String,
        required: true,
    },
    carprice: {
        type: String,
        required: true,
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
