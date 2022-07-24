const mongoose = require('mongoose');


const billsSchema = new mongoose.Schema({
    invoiceId: {
        type: String,
        required: true
    },
    billNo: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    billDate: {
        type: String,
        rquired: true
    }
})

const Bills = mongoose.model('Bills', billsSchema);
module.exports = Bills;
