const Router = require("koa-router");
const router = new Router();
const Ctrl = require("../controllers/transaction");

router.post("/", Ctrl.findByAccountId);
module.exports = router.routes();
