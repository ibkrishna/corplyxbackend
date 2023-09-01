const mongoose = require("mongoose");

const ModalSchema = new mongoose.Schema({
    name: String,
    education: String,
    year: Date,
    url: String
});



const ModalModel = mongoose.model('modal', ModalSchema);


module.exports = ModalModel;