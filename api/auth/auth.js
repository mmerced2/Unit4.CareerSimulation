const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {createUser, findUserByUsername}= require('../../db/users');
const {checkUserData, checkUser} = require('./utils')

const authRouter = express.Router();

//register route
authRouter.post('/register', checkUserData, checkUser, async (req,res) =>{
    try{
    //username, password --> req.body
    const {username, password} = req.body;
    //hash password
    const hashPass = await bcrypt.hash(password, parseInt(process.env.SALT) || 5);
    //create user in db
    const user = await createUser({username,password: hashPass});
    //create token for user --> include id
    const token = jwt.sign({id: user.id}, process.env.JWT || "super secret super safe");
    //send response (status, body)
    res.status(201).send({token});
    } catch(error){
        console.log(error)
        //send response (status, body: {token})
        res.status(500).send({error,message: "Could not register user"});
    }

});

//login route
authRouter.post('login', (req,res) => {});

module.exports = authRouter;