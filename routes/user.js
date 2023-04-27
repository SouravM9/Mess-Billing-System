const router = require('express').Router();
let User = require('../models/user');

// Get all Users
router.route('/').get((req, res) => {
  User.find()
    .then((users) => {
      res.json(users)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


// Create new User
router.route('/createUser').post((req, res) => {
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;

  const newUser = new User({
    name,
    imageUrl
  });

  newUser.save()
    .then(() => res.json(`${name} user is created`))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Particular Record
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;