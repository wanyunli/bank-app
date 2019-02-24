const Koa = require("koa");
const Router = require("koa-router");
const Logger = require("koa-logger");
const Cors = require("@koa/cors");
const BodyParser = require("koa-bodyparser");
const Helmet = require("koa-helmet");
const respond = require("koa-respond");
const mongoose = require("mongoose");
require("dotenv").config();
var jwt = require("koa-jwt");

const app = new Koa();
const router = new Router();

// Custom 401 handling if you don't want to expose koa-jwt errors to users
// app.use(function(ctx, next) {
//   return next().catch(err => {
//     if (401 == err.status) {
//       ctx.status = 401;
//       ctx.body = {
//         error: "Protected resource, use Authorization header to get access\n"
//       };
//     } else {
//       ctx.status = 500;
//       ctx.body = {
//         error: "Internal Server Error, please contact developer\n"
//       };
//     }
//   });
// });

app.use(Helmet());

if (process.env.NODE_ENV === "development") {
  app.use(Logger());
}

app.use(Cors());
app.use(
  BodyParser({
    enableTypes: ["json"],
    jsonLimit: "5mb",
    strict: true,
    onerror: function(err, ctx) {
      ctx.throw("body parse error", 422);
    }
  })
);

app.use(respond());

app.use(
  jwt({
    secret: process.env.SECRET
  }).unless({
    path: [/^\/login/, "/"]
  })
);

require("./routes")(router);
// API routes
app.use(router.routes());
app.use(router.allowedMethods());
app.use(require("koa-static")("./build"));

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

module.exports = app;
