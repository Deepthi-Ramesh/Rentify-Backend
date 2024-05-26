var nodemailer = require('nodemailer');
var env = require('dotenv').config();
const mail=async(tomail,subject,name,email,phoneno)=>{

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: 'wbxgtqiixieekebi'
  }
});

var mailOptions = {
  from: 'deepthimr1411@gmail.com',
  to: tomail,
  subject: subject,
  text: `Name :- ${name} \n
       Email :-${email} \n
        MobileNumber :-${phoneno}`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
module.exports ={
    mail
}






