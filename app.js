var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Order=require("./models/order");
var app = express();
mongoose.connect("mongodb://rituraj07:qwert07@ds261377.mlab.com:61377/shopifyorders", { useNewUrlParser: true }).then(
    ()=>{
      console.log("connected to mongoDB")},
   (err)=>{
       console.log("errorrrr",err);
  });
var methodOverride = require("method-override");
var flash = require("connect-flash");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine","ejs");
app.use(express.static('views'));

app.get("/",function(req,res){
   console.log("great");
   Order.find({},function(err, allOrder){
    if(err)
    {console.log("1err");}
    else{
        res.render("index.ejs",{orders:allOrder});
    }
});
});
app.get("/order/:id",function(req,res){
    //console.log(req.params.id);
    Order.find({id:req.params.id},function(err,order){
     if(err)
     {console.log("1err");}
     else{
         console.log(order);
         res.render("OrderPage.ejs",{order:order[0]});
     }
 });
});
app.get("/order/:id/edit",function(req,res){
    Order.find({id:req.params.id},function(err,order){
        if(err)
        {console.log("1err");}
        else{
            console.log(order);
            res.render("editOrder.ejs",{order:order[0]});
        }
    });
    });
app.post("/order/:id/edit",function(req,res){

    var UpdateOrder={
        email: req.body.email,
        number:req.body.number,
        total_price:req.body.price,
        currency:req.body.currency,
        line_items:req.body.line_items,
        billing_address:req.body.billing_address
       };
       console.log(req.body);
       console.log(req.body.line_items.title);
        Order.findOneAndUpdate({id:req.params.id},UpdateOrder,function(err,UpdateOrder){
            if(err)
            {
            res.redirect("/");}
            else{
                res.redirect("/order/"+req.params.id);
            }
        });
    });

app.post("/getOrder",function(req,res){
console.log(req.body.line_items.title);
//res.send(toString(req.body));

   var newOrder={
    id : req.body.id,
    email: req.body.email,
    number:req.body.number,
    total_price:req.body.total_price,
    currency:req.body.currency,
    payment_gateway_names:req.body.payment_gateway_names,
    line_items:req.body.line_items,
    billing_address:req.body.billing_address
   };
   Order.create(newOrder, function(err,newtodo){
        if(err)
        {console.log("err");}
        else{
            console.log("added");
        }
    }); 
});

app.listen(process.env.PORT||3010);