const mongoose = require("mongoose");
const mongoUrl = 'mongodb+srv://corplyx:corplyx123@cluster0.5dwbyza.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongoUrl)
.then(() => {
    console.log("Connection Successfully");
})
.catch((error) => {
    console.log("NO Connection");
})