module.exports = router => {
  router.prefix("/v1");
  router.use("/account", require("./account"));
  router.use("/payment", require("./payment"));
  router.use("/transactions", require("./transaction"));
};
