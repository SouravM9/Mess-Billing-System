const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealSchema = new Schema({
    date: { type: Date, required: true, default: Date.now },
    food: { type: mongoose.ObjectId, ref: "Food", required: true },
    user: { type: mongoose.ObjectId, ref: "User", required: true },
    cost: { type: Number, required: true }
}, {
    timestamps: true,
});

const meal = mongoose.model('Meal', mealSchema);

module.exports = meal;