const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const request=require("request");
const port=3000;

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  var fName=req.body.fname;
  var lName=req.body.lname;
  var email=req.body.email;

  const data={
    memebers:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fName,
          LNAME:lName
        }
      }
    ]
  };

  const jsonData=JSON.stringify(data);

  const url="https://us20.api.mailchimp.com/3.0/lists/81df6e6051";

  const options={
    method:"POST",
    auth:"Sanchit:ea399f5e22b926a0653d42fd44ce6913-us20"
  }

  const req1=https.request(url,options,function(res1){
    if(res1.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    } else {
      res.send(__dirname+"/failure.html");
    }

    res1.on("data",function(data){
        console.log(JSON.parse(data));
    });

  });

  req1.write(jsonData);
  req1.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || port,function(){
  console.log("Server is running on port 3000");
});

// api key ea399f5e22b926a0653d42fd44ce6913-us20

// audience key 81df6e6051
