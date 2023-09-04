const express = require('express');
const bodyParse= require('body-parser');
const app = express();
var api_key = 'key-252a23293e2db535c2dd1fe0ba340bad';
var domain = 'sandboxe198bd7515404b4cb39533eddfdd6f54.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var data ={
    from: 'lakshya4806.be22@chitkara.edu.in',
    to: 'lakshya4806.be22@chitkara.edu.in',
    subject: 'Verification',
    text: 'You received a new mail.'
};

app.use(bodyParse.urlencoded({extended:true}))
app.use(express.static("Public"));
app.get("/",function(req,res){  
    res.sendFile(__dirname+"/index.html")
});

app.listen(8000, function(req, rev)
{
    console.log('server is running on 8080');
});

app.post('/',function(req,res)
{
    console.log(req.body.email);
    console.log(req.body);
    console.log(data);
    
    data.to = req.body.email;
    
    mailgun.messages().send(data, function (error, body){
        if (error){
            console.log(error);
        }
        console.log(body);
        console.log("email sent successfully")
    });
});


