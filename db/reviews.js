const prisma = require("./index");

const createReview = (reviewsData) => {
    return prisma.reviews.create({
        data: reviewsData,
    });
};

const getReviews = (user_id) => {
    return prisma.reviews.findMany({
        where: {user_id},
    });
};

const getReviewById = async (review_id) => {
    return prisma.reviews.findUnique({
        where: {id: review_id},
    });
};

const updateReview = (id, reviewsData) => {
    return prisma.reviews.update({
        where: {reviewsData: id},
        data: reviewsData,
    });
};

const deleteReview = async (id) => {
    const review = await getReviewById(id);
    if (review) {
        return prisma.reviews.delete({
            where: {review_id: id},
        });
    }
    return;
};




module.exports = {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};