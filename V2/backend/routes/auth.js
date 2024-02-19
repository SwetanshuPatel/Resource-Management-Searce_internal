const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Login Successful",
      user: req.user,
    });
  } else {
    res.status(403).json({
      error: true,
      message: "User Unauthorized",
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.statusCode(401).json({
    error: true,
    message: "Login Failed",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/google",
  passport.authenticate("google", ["profile", "email"])
);

module.exports = router;
