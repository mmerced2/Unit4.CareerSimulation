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

//placeholder//not complete 
reviewsRouter.get("/:id", async (req,res,next) => {
    try{
        const reviews = await getReviewById(req.params.id);

    }catch(error){
        next(error);
    }
})

module.exports = reviewsRouter;
