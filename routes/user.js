const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const {
  renderSignUp,
  signUp,
  renderLogin,
  logIn,
  logOut,
} = require("../controller/user");

router.route("/signup").get(renderSignUp).post(wrapAsync(signUp));

router
  .route("/login")
  .get(renderLogin)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    logIn
  );

router.get("/logout", logOut);

module.exports = router;
