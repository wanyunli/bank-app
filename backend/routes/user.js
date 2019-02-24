const Router = require("koa-router");
const router = new Router();
const Ctrl = require("../controllers/user");

// router.get("/", Ctrl.findAll);
router.post("/", Ctrl.login);
module.exports = router.routes();
