const express = require("express");
const nodemailer = require("nodemailer");

const ModalModel = require("../models/modalModels");
const modalRouter = express.Router();

const sendMail = async (req, res) => {

    // let testAccount =  await nodemailer.createTestAccount();
    console.log('req',req)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'corplyxtechnologies000@gmail.com',
            pass: "liacwcfvekhkezja"
        }
    });


    const mailOptions = {
        from: 'Corplyx Technologies', // sender address
        to: "corplyxtechnologies000@gmail.com", // list of receivers
        subject: "Modal Data", // Subject line
        html: `<p>  Name : ${req.name} </p>
        <p>  Education : ${req.education} </p>
        <p>  Year : ${req.year} </p>
        // <p>  CV : ${req.url} </p>`
        // <p>  CV : <a href="${req.url}">${req.url}</a> </p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    // console.log("Message sent: %s", info.messageId);

    // res.json(info);
}





const multer  = require('multer')
// app.use(express.urlencoded({extended: false}));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       return cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}` );
    }
});

const upload = multer({ storage })





modalRouter.get("/", (req, res) => {
    res.send("Modal Route is working");
})

modalRouter.post("/postCareersForm", upload.single(), async (req, res) => {
    try {
        const modalCreate = new ModalModel ({
            name: req.body.name,
            education: req.body.education,
            year: req.body.year,
            url: req.file.path
        })

        // console.log()
        console.log('modelCreate', modalCreate)
   
        sendMail(modalCreate)
           
    
        const data = await modalCreate.save();
    
        console.log(data);
        // return res.redirect("/");

        res.json({
            "status": 1,
            "message": "modal info is Created in database check now"
        })
    }
    catch(error) {
        res.json({
            "status": 0,
            "message": "modal info not created due to error"
        });
    }
})

// app.post("/upload", upload.single('profileImage'), (req, res) => {
//     console.log(req.body);
//     console.log(req.file);


//     return res.redirect("/");
// })


module.exports = modalRouter;