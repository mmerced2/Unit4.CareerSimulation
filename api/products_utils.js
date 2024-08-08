function requireUser(req, res, next) {
    if (!req.user || !req.user.user_id) {
      return res.status(401).send("You must be logged in to do that.");
    }
    next();
  };
  
  /**
   *
   * Makes sure that we have all the required information
   * before creating a new product
   */
  function checkProductsData(req, res, next) {
    const { product_type, description } = req.body;
    if (!product_type || !description ) {
      return res
        .status(400)
        .send("Please provide your product details");
    }
    next();
  };
  
  module.exports = {
    checkProductsData,
    requireUser,
  };