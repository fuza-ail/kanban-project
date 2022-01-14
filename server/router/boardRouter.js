const router = require("express").Router();

const { authenticate } = require("../middlewares/authentication");

const { BoardController } = require("../controllers/boardController");

router.get("/api/v1/boards", authenticate, BoardController.getBoards);
router.post("/api/v1/boards", authenticate, BoardController.createBoard);
router.delete("/api/v1/boards/:id", authenticate, BoardController.deleteBoard);
router.put("/api/v1/boards/:id", authenticate, BoardController.updateBoard);

module.exports = router;