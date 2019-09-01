var mongoose = require("mongoose");
var orderSchema = mongoose.Schema({

    id : {type: String,required:true,unique: true},
     email: {type: String,required:true},
     number:Number,
     total_price:Number,
     currency:String,
     payment_gateway_names:[{type:String}],
     line_items:[{
         id:String,
         title:String
     }],
     billing_address:{
         first_name:String,
         address1:String,
         city:String,
         zip:String
     }
       

});

module.exports = mongoose.model('Order', orderSchema);