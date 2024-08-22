const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {findUserById} = require("../db/users");
const {requireUser} = require("./products_utils")

// set `req.user` if possible
router.use(async (req, res, next) => {
    const prefix = "Bearer ";
    const auth = req.header("Authorization");
  
    if (!auth) {
      // nothing to see here
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
  
      try {
        const { id } = jwt.verify(
          token,
          process.env.JWT || "super secret super safe"
        );
  
        if (id) {
          req.user = await findUserById(id);
          next();
        } else {
          next({
            name: "AuthorizationHeaderError",
            message: "Authorization token malformed",
          });
        }
      } catch ({ name, message }) {
        next({ name, message });
      }
    } else {
      next({
        name: "AuthorizationHeaderError",
        message: `Authorization token must start with ${prefix}`,
      });
    }
  });

//auth routers
router.use("/auth", require("./auth/auth"));


//product routers
const productsRouter = require("./products")
router.use("/products",productsRouter );


//users router
const usersRouter = require("./users");
router.use("/users", usersRouter);

//reviews router
const reviewsRouter = require("./reviews");
router.use("/reviews", reviewsRouter);



router.use((error, req, res, next) => {
    res.send(error);
  });

module.exports = router;