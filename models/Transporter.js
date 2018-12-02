const mongoose = require('mongoose');

const TransporterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Transporter', TransporterSchema);