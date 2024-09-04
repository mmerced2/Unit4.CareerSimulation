const express = require("express");
const reviewsRouter = express.Router();
const {requireUser} = require("./products_utils");
const {getReviews, getReviewById, updateReview,deleteReview,createReview,getReviewsbyUserId } =require('../db/reviews')


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



///placeholder for get review by user id
reviewsRouter.get("/user/:id", async (req,res,next) => {
    try{
        const review = await getReviewsbyUserId(req.params.id);
        res.send({review});

    }catch({name, message}){
        next({ name, message });
    }
});


///placeholder for creating review
reviewsRouter.post("/:id", requireUser,async (req,res,next) => {
    try{
        console.log(req.user);
        const review = await createReview({
          ...req.body,
          product_id: req.params.id,
        });
    
        res.send({ review });
    }catch({name, message}){
        next({name, message});
    }
});

///placeholder for updating review
reviewsRouter.put("/:id",requireUser, async (req,res,next) => {
    try{
      const {rating,text} = req.body;
      const review = await updateReview(req.params.id, {rating,text});
      res.status(200).send({review});

    }catch({name, message}){


        next({name, message});
    }
});


///placeholder for deleting review
reviewsRouter.delete("/:id",requireUser, async (req,res,next) => {
    try{
      const review = await deleteReview(req.params.id);
      console.log("deleted review:" , review);
      res.send({review});

    }catch(error){
        console.log(error)
        next(error);
    }
});


module.exports = reviewsRouter;
