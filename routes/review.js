const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isLoggedIn, isReviewAuther } = require("../middleware");
const { createReview, deleteReview } = require("../controller/review");

router.post("/", isLoggedIn, validateReview, wrapAsync(createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuther,
  wrapAsync(deleteReview)
);

module.exports = router;
