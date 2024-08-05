const {findUserByUsername} = require("../../db/users");

const checkUserData = (req,res,next) => {
//username, password --> req.body
const {username, password} = req.body;

if (!username || !password){
    return res.status(400).send({message: 'Please provide username and password'});
}

next();

};

const checkUser = async (req,res,next) => {
    //username, password --> req.body
    const oldUser = await findUserByUsername(req.body.username);

    if(oldUser){
        return res.status(400).send({message: 'That username is already taken'});
    };
    
    next();
    
    };



module.exports = {checkUserData, checkUser};