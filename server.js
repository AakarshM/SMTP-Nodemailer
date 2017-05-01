var express = require('express');
var app = express();
var jwt = require('jsonwebtoken')

const nodemailer = require('nodemailer');
var schedule = require('node-schedule');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'EMAIL',
        pass: 'PASS'
    } 
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    to: 'aakarshmadhavan@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};


app.get('/verify', function (req, res) {
    var token = req.query.token;
    jwt.verify(token, 'secret', function(err, decoded) {
  if (err) {
    res.json(err);
  } 
  res.json(decoded);
});

})

app.get('/token', function (req, res) {
   
   var token = jwt.sign({}, 
    'secret', { 
        expiresIn: 60
    }); //60sec

   res.send(token);

});

app.get('/', function (req, res) {
    res.send("Root");
})

app.get('/mail', function (req, res) {
	// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.send("done");
});
	
})

var date = new Date(2017, 3, 25, 16, 16, 0);

var j = schedule.scheduleJob(date, function(){
  console.log('Ayy');
});

app.listen(3000, function () {
	// body...
	console.log("Running on 3000")
})