const router = require("express").Router();

const { authenticate } = require("../middlewares/authentication");

const { TaskController } = require("../controllers/taskController");

router.post("/api/v1/tasks", authenticate, TaskController.createTask);
router.delete("/api/v1/tasks/:id", authenticate, TaskController.deleteTask);
router.put("/api/v1/tasks/:id", authenticate, TaskController.updateTask);

module.exports = router;