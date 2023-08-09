const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.route('/')
   .get((req, res) => {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.status(400).json('Error: ' + err))
    })
;

router.route('/add')
    .post((req, res) => {
        const username = req.body.username;
        const image = req.body.image;

        const newUser = new User({username, image});

        newUser.save()
            .then(() => res.json('User added!'))
            .catch(err => res.status(400).json('Error: ' + err))
    })
;

module.exports = router;