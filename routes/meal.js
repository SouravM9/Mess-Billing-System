const router = require('express').Router();
let Meal = require('../models/meal');
let mongoose = require('mongoose');

// // Get all Foods
router.route('/').get((req, res) => {
    Meal.find()
        .populate("food", "_id itemName itemPrice imageUrl")
        .populate("user", "_id name imageUrl")
        .sort({ createdAt: -1 })
        .then((meals) => {
            res.json(meals)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


// Create new Food
router.route('/createMeal').post((req, res) => {
    const date = req.body.date;
    const food = req.body.food;
    const user = req.body.user;
    const cost = req.body.cost;

    const newMeal = new Meal({
        date,
        food,
        user,
        cost
    });

    newMeal.save()
        .then(() => res.json(`Meal is added`))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Particular Meal Record
router.route('/:id').delete((req, res) => {
    Meal.findByIdAndDelete(req.params.id)
        .then(() => res.json('Meal deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Update Food
router.route('/update/:id').put((req, res) => {
    Meal.findByIdAndUpdate(req.params.id, { date: req.body.date, user: req.body.user, food: req.body.food, cost: req.body.cost })
        .then(meal => {
            res.status(200).send("Record updated!")
        }).catch(err => res.status(400).json('Error: ' + err));
});

// Get All Meals By Date Range for a particular user
router.route('/:fromdate/:todate/:userid').get((req, res) => {
    let day = new Date(req.params.todate);
    let nextDay = new Date(req.params.todate);
    nextDay.setDate(day.getDate() + 1)

    Meal.find({
        date: {
            $gte: new Date(req.params.fromdate),
            $lt: nextDay
        },
        user: req.params.userid
    })
        .populate("food", "_id itemName itemPrice")
        .populate("user", "_id name imageUrl")
        .then((meals) => {
            res.json(meals)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get All Meals By Date Range for a particular user
router.route('/calculate/:fromdate/:todate/:userid').get((req, res) => {
    let day = new Date(req.params.todate);
    let nextDay = new Date(req.params.todate);
    nextDay.setDate(day.getDate() + 1)
    const userId = new mongoose.Types.ObjectId(req.params.userid);

    Meal.aggregate([
        {
            $match: {
                user: userId,   // issue with user filter
                date: {
                    $gte: new Date(req.params.fromdate),
                    $lt: nextDay
                }
            }
        },
        {
            $group: {
                _id: null,
                totalCost: { $sum: "$cost" }
            }
        }
    ])
        .then((meals) => res.json(meals))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get Meal by Id
router.route('/:id').get((req, res) => {
    Meal.findById(req.params.id)
        .populate("food", "_id itemName itemPrice")
        .populate("user", "_id name imageUrl")
        .then((meal) => {
            res.json(meal)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;