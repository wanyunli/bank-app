const Router = require("koa-router");
const router = new Router();
const Ctrl = require("../controllers/payment");

router.post("/", Ctrl.create);
module.exports = router.routes();
