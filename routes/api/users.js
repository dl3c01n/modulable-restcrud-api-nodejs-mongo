const express = require('express');
const router = express.Router();

const Users = require('../../models/user_models');

// Display all users
router.get('/', async (req, res) => {
    try {
        const users = await Users.find();
        if(!users) throw Error('No users found')
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ message: error})
        console.error(error)
    }
})


// Display user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if(!user) throw Error('No users found using this id')
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

// Create an user
router.post('/', async (req, res) => {
    const newUser = new Users(req.body)

    try {
        const user = await newUser.save()
        if(!user) throw Error("Something went wrong while adding the user")

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error})
        console.error(error)
    }
})


// Delete an user
router.delete('/:id', async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.id)

        if(!user) throw Error("Unable to delete this id, check it")

        res.status(200).json({ success: true});
    } catch (error) {
        res.status(400).json({ message: error})
        console.error(error)
    }
})

// Update an user
router.patch('/:id', async (req, res) => {
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body)
        if(!user) throw Error('Something went wrong')
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({ msg: error})
        console.error(error)
    }
})

module.exports = router;