const router = require("express").Router();
const tokensRouter = require("./tokens.routes");
const errorRouter = require("./error.routes");
const authRouter = require("./auth.routes");
const tracksRouter = require("./track.routes");

router.use("/tokens", tokensRouter);
router.use("/tracks", tracksRouter);
router.use("/auth", authRouter);

// должна быть в конце
router.use("*", errorRouter);

module.exports = router;