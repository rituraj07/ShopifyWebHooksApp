var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Order=require("./models/order");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect("mongodb://<dbuser>:<dbpassword>@ds261377.mlab.com:61377/shopifyorders", { useNewUrlParser: true }).then(
    ()=>{
      console.log("connected to mongoDB")},
   (err)=>{
       console.log("err",err);
  });

app.set("view engine","ejs");
app.use(express.static("public"));
//app.use(MO("_method"));


app.get("/",function(req,res){
   console.log("great");
   res.send("great");
});
app.post("/getOrder",function(req,res){
console.log(req.body);
res.send(toString(req.body));
   var newOrder={
    id : req.body.id,
    email: req.body.email,
    /*number:req.body.number,
    total_price:req.body.total_price,
    currency:req.body.currency,
    payment_gateway_names:req.body.payment_gateway_names,
    line_items:[{
        id:req.body.line_items.id,
        title:req.body.line_items.title
    }],
    billing_address:{
        first_name:req.body.first_name,
        address1:req.body.address1,
        city:req.body.city,
        zip:req.body.zip
    }*/
   };
   Order.create(newOrder, function(err,newtodo){
        if(err)
        {console.log("err");}
        else{
            console.log("added");
        }
    }); 
});
app.delete("/apis/todoes/:id",function(req,res){
    todo.findByIdAndRemove(req.params.id,function(err){
        if(err)
        {console.log(err);}
        
    });
});
//app.put("")
app.listen(process.env.PORT );