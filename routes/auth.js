const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

router.post('/signup', (req, res) => {
    const { name, password, imageUrl, userType } = req.body;
    if (!name || !password || !imageUrl) {
        return res.status(422).json({ error: "Please fill up all fields" });
    }
    User.findOne({ name: name })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists" });
            }
            bcrypt.hash(password, 12) //encrypt the password
                .then(hashedpassword => {
                    const user = new User({
                        name: name,
                        password: hashedpassword,
                        imageUrl: imageUrl,
                        userType: userType
                    });

                    user.save()
                        .then(user => {
                            res.json({ message: "User registered successfully" });
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })

        })
        .catch(err => {
            console.log(err);
        });
});

router.put('/forgotpassword', (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(422).json({ error: "Please fill up all fields" });
    }
    User.findOne({ name: name })
        .then((savedUser) => {
            if (savedUser) {
                const userId = savedUser._id;

                bcrypt.hash(password, 12) //encrypt the password
                    .then(hashedpassword => {

                        User.findByIdAndUpdate(userId, { password: hashedpassword })
                            .then(usr => {
                                res.status(200).send("Password updated!")
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    })
            }
        })
        .catch(err => {
            console.log(err);
        });
});


router.post('/signin', (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        res.status(422).json({ error: "Please fill up the name and password" });
    }
    User.findOne({ name: name })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Name or Password" });
            }
            bcrypt.compare(password, savedUser.password)  //Compare the password provided with db one
                .then(doMatch => {
                    if (doMatch) {
                        //res.json({ message: "Successfully signed in" });
                        const token = jwt.sign({ _id: savedUser._id }, jwt_secret); // Generate a Json Web Token so that user can access protected resource using that token
                        const { _id, name, imageUrl, userType } = savedUser;
                        res.json({ token: token, user: { _id, name, imageUrl, userType } });
                    }
                    else {
                        return res.status(422).json({ error: "Invalid Email or Password" });
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })
})

module.exports = router;