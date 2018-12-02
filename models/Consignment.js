const mongoose = require('mongoose');

const ConsignmentSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
    },
    transporter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Transporter'
    },
    deliveryAddress: {
        type: String,
        required: true,
    }, 
    recipient: {
        type: String,
        required: true,
    },
    cashOnDelivery: {
        type: Boolean,
    },
    note: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Consignment', ConsignmentSchema);