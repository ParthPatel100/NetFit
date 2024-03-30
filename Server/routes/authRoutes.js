const express = require('express')
const router = express.Router();
const cors = require('cors')
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const User = require("../MongoDB/schema/user");
const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })


router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)


router.post('/verifyLogin',  async (req, res) => {
    try {
        const {username, password} = req.body
        await mongoose.connect("mongodb://admin:password@localhost:27017/app_db?authSource=admin");
        const user = await User.findOne({username})
        if (!user) {
            return res.json({
                error: 'No user found'
            })
        }
        const match = await bcrypt.compare(password, user.password)
        if (match) {
            jwt.sign({email: user.email, id:user._id, name: user.username}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                res.cookie('token', token).json({
                    "username": user.username,
                    "id": user._id
                });
            });
        }
        if(!match){
            return res.json({
                error: 'Wrong password'
            })
        }
    } catch (error) {

    }
})

router.get('/profile', async (req, res) => {
    const {token} = req.cookies
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err
            res.json(user)
        })
    }
    else{
        res.json(null)
    }
})

router.get('/logout', (req, res) => {
    // Destroy session or remove authentication token
    res.cookie('token', '', {maxAge: 1});
    return res.json("Logout Successful")
});

router.post('/Register',  async (req, res) => {
    try {
        const {username, password,email,experienceLevel,gender,age,user_role} = req.body
        await mongoose.connect("mongodb://admin:password@localhost:27017/app_db?authSource=admin");
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = new User({
            username: username,
            email: email,
            password: hash,
            user_role: user_role,
            gender: gender,
            age: age,
            experienceLevel: experienceLevel
        });
        const savedUser = await user.save();
        await mongoose.connection.close();
        res.json("wokring")
    } catch (error) {
        if(error.toString().includes("username")){
            res.json("Please choose a unique username")
        }
        if(error.toString().includes("email")){
            res.json("Please choose a unique email")
        }
        console.log(error)
    }
});

module.exports = router