const router = require("express").Router();

const { authenticate } = require("../middlewares/authentication");

const { MemberController } = require("../controllers/memberController");

router.post("/api/v1/members", authenticate, MemberController.addMember);
router.delete("/api/v1/members/:id", authenticate, MemberController.deleteMember);

module.exports = router;