const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    itemName: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    imageUrl: { type: String, required: true }
}, {
    timestamps: true,
});

const food = mongoose.model('Food', foodSchema);

module.exports = food;