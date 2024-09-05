const prisma = require("./index");

const createReview = (reviewsData) => {
    return prisma.reviews.create({
        data: reviewsData,
    });
};

const getReviewsbyUserId = (user_id) => {
    return prisma.reviews.findMany({
        where: {user_id},
        include: {
            products : true,
        },
    });
};

const getReviewById = async (review_id) => {
    return prisma.reviews.findUnique({
        where: {id: review_id},
    });
};

const getReviewByProductId = (product_id) => {
    return prisma.reviews.findUnique({
        where: {id: product_id},
    })
}

const updateReview = (review_id, reviewsData) => {
    return prisma.reviews.update({
        where: {id: review_id},
        data: reviewsData,
    });
};

const deleteReview = async (review_id) => {
    const review = await getReviewById(review_id);
    if (review) {
        return prisma.reviews.delete({
            where: {id: review_id},
        });
    }
    return;
};




module.exports = {
  getReviewsbyUserId,
  getReviewById,
  getReviewByProductId,
  createReview,
  updateReview,
  deleteReview
};