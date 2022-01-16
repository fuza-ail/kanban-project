const router = require("express").Router();
const { authenticate } = require("../middlewares/authentication");

const { UserController } = require("../controllers/userController");

router.post("/api/v1/login", UserController.login);
router.post("/api/v1/register", UserController.register);
router.get("/api/v1/auth", authenticate, UserController.authenticate);

module.exports = router;