const express = require("express");
const usersRouter = express.Router();
const {requireUser} = require("./products_utils")

usersRouter.get("/", requireUser,async(req, res, next) => {
    try{
        //delete the user's password since the FE doesnt need this
        delete req.user.password
    /**
     * since we got the user within the /api/index.js file
     * before all routes we don't have to re-query the
     * database since we already have the information on req.
     * user
     */
 res.send({
    user: req.user
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
