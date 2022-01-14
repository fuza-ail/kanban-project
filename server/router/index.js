const router = require("express").Router();

const userRouter = require("./userRouter");
const boardRouter = require("./boardRouter");
const memberRouter = require("./memberRouter");
const groupRouter = require("./groupRouter");
const taskRouter = require("./taskRouter");

router.use(userRouter);
router.use(boardRouter);
router.use(memberRouter);
router.use(groupRouter);
router.use(taskRouter);

module.exports = router;