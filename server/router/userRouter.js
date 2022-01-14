const router = require("express").Router();

const { UserController } = require("../controllers/userController");

router.post("/api/v1/login", UserController.login);
router.post("/api/v1/register", UserController.register);

module.exports = router;