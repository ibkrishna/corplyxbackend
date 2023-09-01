const express = require("express");
const cors = require("cors");
const contactRouter = require("./routes/contactRoutes");
const modalRouter = require("./routes/modalRoutes");
const multer  = require('multer')




const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());
app.use(express.urlencoded({extended: false}));

require("./models/conn.js");

app.use("/contact", contactRouter);
app.use("/modal", modalRouter);

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//        return cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//         return cb(null, `${Date.now()}-${file.originalname}` );
//     }
// });

// const upload = multer({ storage })

app.get("/", (req, res) => {

    res.json({
        "message": "Default route"
    })

})

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})