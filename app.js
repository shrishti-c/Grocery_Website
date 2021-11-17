var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phoneno;
    var password = req.body.pass;

   
    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            console.log(err);
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('./login.html')
    


})

app.post("/log_in",(req,res)=>{
    var name = req.body.name;
    var password = req.body.password;

    var query={name:name, password:password};
    
    db.collection('users').findOne(query,(err,user)=>{
        if(err) throw new Error(err);
        if(!user) 
        {
          console.log('Not found');
          return res.redirect("../error/error.html")
        }
        else 
        {
          console.log('Found!');
          return res.redirect('home.html')
        }
    });

    
    


})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('./signup.html');
}).listen(3000);


console.log("Listening on PORT 3000");