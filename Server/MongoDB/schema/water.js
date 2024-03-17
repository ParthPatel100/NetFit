const mongoose = require('mongoose');

const waterSchema = new mongoose.Schema({
    //removed data key from here as it is already stored on tracking
    measurement: {
        type: String, 
        required: true,
        enum: ['cup', 'L', 'ml', 'oz']
    },
    amount: {type: Number, required: true, min: 0}
    
});


module.exports = mongoose.model('water', waterSchema);
