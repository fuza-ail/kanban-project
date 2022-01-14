const router = require("express").Router();

const { authenticate } = require("../middlewares/authentication");

const { TaskController } = require("../controllers/taskController");

router.post("/api/v1/tasks", authenticate, TaskController.createTask);
router.put("/api/v1/tasks/:id", authenticate, TaskController.updateTask);
router.delete("/api/v1/tasks/:id", authenticate, TaskController.deleteTask);

module.exports = router;