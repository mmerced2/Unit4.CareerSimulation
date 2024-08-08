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
        const reviews = await getReviewById(req.params.id);

    }catch(error){
        next(error);
    }
});


///placeholder for creating review
reviewsRouter.post("/", async (req,res,next) => {
    try{
      

    }catch(error){
        next(error);
    }
});

///placeholder for updating review
reviewsRouter.patch("/", async (req,res,next) => {
    try{
      

    }catch(error){
        next(error);
    }
});


///placeholder for deleting review
reviewsRouter.delete("/", async (req,res,next) => {
    try{
      

    }catch(error){
        next(error);
    }
});


module.exports = reviewsRouter;
