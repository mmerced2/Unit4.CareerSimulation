const express = require("express");
const reviewsRouter = express.Router();
const {requireUser} = require("./products_utils");
const {getReviews, getReviewById, updateReview,deleteReview,createReview} =require('../db/reviews')


//get request for reviews
reviewsRouter.get("/",  async(req, res, next) => {
    try{
        const reviews = await getReviews();
        res.send(reviews);

  } catch (error) {
    next({ err});
  }
});


///placeholder for get review by id
reviewsRouter.get("/:id", async (req,res,next) => {
    try{
        const review = await getReviewById(req.params.id);
        res.send({review});

    }catch({name, message}){
        next({ name, message });
    }
});


///placeholder for creating review
reviewsRouter.post("/", requireUser,async (req,res,next) => {
    try{
        const review = await createReview({...req.body, user_id: req.user.user_id});
        res.send({review});
      

    }catch({name, message}){
        next({name,message});
    }
});

///placeholder for updating review
reviewsRouter.patch("/", async (req,res,next) => {
    try{
      const review = await getReviewById(req.params.id);
      res.send({review});

    }catch({name, message}){
        next({name, message});
    }
});


///placeholder for deleting review
reviewsRouter.delete("/:id",requireUser, async (req,res,next) => {
    try{
      const review = await deleteReview(req.params.id);
      res.send({review});

    }catch({name, message}){
        next({name, message});
    }
});


module.exports = reviewsRouter;
