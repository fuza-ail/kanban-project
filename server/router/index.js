const router = require("express").Router();

const authenticationRoute = require("./authenticationRouter");

router.use(authenticationRoute);

module.exports = router;