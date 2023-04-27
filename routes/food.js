const router = require('express').Router();
let Food = require('../models/food');

// Get all Foods
router.route('/').get((req, res) => {
    Food.find()
        .then((foods) => {
            res.json(foods)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


// Create new Food
router.route('/createFood').post((req, res) => {
    const itemName = req.body.itemName;
    const itemPrice = req.body.itemPrice;
    const imageUrl = req.body.imageUrl;

    const newFood = new Food({
        itemName,
        itemPrice,
        imageUrl
    });

    newFood.save()
        .then(() => res.json(`${itemName} is added`))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Particular Food Record
router.route('/:id').delete((req, res) => {
    Food.findByIdAndDelete(req.params.id)
        .then(() => res.json('Food deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Update Food
router.route('/update/:id').put((req, res) => {
    Food.findByIdAndUpdate(req.params.id, { itemName: req.body.itemName, itemPrice: req.body.itemPrice })
        .then(food => {
            res.status(200).send("Record updated!")
        }).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;