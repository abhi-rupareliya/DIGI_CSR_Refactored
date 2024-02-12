const {
  PostReview,
  getNGOReviews,
  deleteReview,
} = require("../Controllers/review.controllers");
const AuthMiddleware = require("../Middlewares/auth.middleware");

const ReviewRoutes = (app) => {
  app.post("/add-review", AuthMiddleware, PostReview);
  app.get("/get-reviews/:id", AuthMiddleware, getNGOReviews);
  app.delete("/review/delete/:id", AuthMiddleware, deleteReview);
};

module.exports = ReviewRoutes;
