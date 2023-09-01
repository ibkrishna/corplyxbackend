const express = require("express");
const nodemailer = require("nodemailer");
const ContactModel = require("../models/contactModels");


const contactRouter = express.Router();


const sendMail = async (contactData) => {

    // let testAccount =  await nodemailer.createTestAccount();
    console.log('req',contactData)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'corplyxtechnologies000@gmail.com',
            pass: "liacwcfvekhkezja"

        }
    });


    const mailOptions = {
        from: 'Corplyx Technologies', // sender address
        to: "balkrishnapandey21@gmail.com", // list of receivers
        subject: "New Contact Form Submission", // Subject line
        html: `<p>  Name : ${contactData.name} </p>
        <p>  Subject : ${contactData.subject} </p>
        <p>  Email : ${contactData.email} </p>
        <p>  Message : ${contactData.message} </p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
}




contactRouter.get("/", (req, res) => {
    res.send("Contact route is working");
})

contactRouter.post("/postContactDetails", async (req, res) => {
    try {
        const contactCreate = new ContactModel ({
            name: req.body.name,
            subject: req.body.subject,
            email: req.body.email,
            message: req.body.message
        })


        sendMail(contactCreate)
    
        const data = await contactCreate.save();
    
        console.log(data);

        res.json({
            "status": 1,
            "message": "Contact info is Created in database check now"
        })
    }
    catch(error) {
        res.json({
            "status": 0,
            "message": "contact info not created due to error"
        });
    }
})


module.exports = contactRouter;