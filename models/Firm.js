
const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema({
    firmName:{
        type:String,
        required: true,
        unique: true
    },
    category:{
        type: [{
            type : String,
            enum : ['veg', 'non-veg'] //giving multiple values we use enum
        }]
    },
    region:{
        type:[
            {
                type:String,
                enum:['south-indian', 'north-indian', 'chinese', 'bakery']
            }
        ]
    },
    offer:{
        type:String
    },
    image:{
        type:String
    },
    vendor:[{
        type: mongoose.Schema.Types.ObjectId ,//relating firm with vendor
        ref :'Vendor' //relation
    }],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

const Firm = mongoose.model('Firm', firmSchema);

module.exports = Firm 