const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controller/listing");

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    validateListing,
    wrapAsync(listingController.createListing)
  );

router.get("/new", isLoggedIn, listingController.renderNewListing);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing)
);

module.exports = router;
