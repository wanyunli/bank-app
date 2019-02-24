module.exports = router => {
  router.use("/v1/payment", require("./payment"));
  router.use("/v1/transactions", require("./transaction"));
  router.use("/login", require("./user"));
};
