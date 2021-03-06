const express = require('express');
const app = express();

const nodemailer = require("nodemailer")

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.static('public')); 
app.use(express.json())
;
app.get('/', (req, res) => {
    res.send(__dirname + '/public/index.html');
});

app.post('/', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({ 
      service: 'gmail',
      auth: {
          user: 'humanebantuF@gmail.com',
          pass: 'acmbnorpjiejwbiz'
      }
    });

    const mailOption = {
        from: req.body.email,
        to: 'humanebantuF@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOption, (error, info) => {
        if(error) {
            console.log(error);
            res.send('error')
        }else {
            console.log('Email sent' + info.response);
            res.send('success');
        }
    });
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

