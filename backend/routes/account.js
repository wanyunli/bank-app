const Router = require("koa-router");
const router = new Router();
const Ctrl = require("../controllers/account");

// router.get("/", Ctrl.findAll);
router.get("/", Ctrl.findOne);
module.exports = router.routes();
