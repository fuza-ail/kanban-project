const router = require("express").Router();

const { authenticate } = require("../middlewares/authentication");

const { GroupController } = require("../controllers/groupController");

router.get("/api/v1/groups", authenticate, GroupController.getGroups);
router.post("/api/v1/groups", authenticate, GroupController.createGroup);
router.put("/api/v1/groups/:id", authenticate, GroupController.updateGroup);
router.delete("/api/v1/groups/:id", authenticate, GroupController.deleteGroup);

module.exports = router;