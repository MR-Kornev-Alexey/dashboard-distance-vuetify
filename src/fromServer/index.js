const express = require("express");
const cfg = require("./lib/config");
const router = require("./router");
const PublicRouter = require("./publicRouter");
const inputRouter = require("./lib/input-link");
const editRouter = require("./lib/edit");
const deleteRouter = require("./lib/delete");
const searchRouter = require("./lib/search");
const redirectRouter = require("./lib/redirect");
const sortingRouter = require("./lib/sorting");
const loginRouter = require("./loginRouter");
const jwtExpress = require("express-jwt");
const cookieParser = require("cookie-parser");
const iE = require("./lib/isEmpty");

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/public", express.static("public"));
app.use("/oymoyamalaya", express.static("oymoyamalaya"));

app.set("view engine", "ejs");
app.set("trust proxy", 1);

app.use(PublicRouter.publicRouter);
app.use(redirectRouter.redirectRouter);

app.use("/admin/", registerAdminRouter());

app.use(router.notFoundHandler);
app.listen(cfg.http);

function registerAdminRouter() {
  const adminRouter = express.Router();
  adminRouter.use(loginRouter.loginRouter);
  adminRouter.use(cookieParser());
  adminRouter.use(
    jwtExpress({
      secret: cfg.jwt.secret,
      getToken: function(req) {
        const cookie = req.cookies[cfg.authCookie.cookieName];
        if (cookie !== undefined && !iE.isEmpty(cookie)) {
          return req.cookies[cfg.authCookie.cookieName];
        } else {
          return null;
        }
      }
    })
  );
  adminRouter.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res.redirect("/admin/login");
    }
  });
  adminRouter.use(function(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect("/admin/login");
    }
  });

  adminRouter.use(editRouter.editRouter);
  adminRouter.use(router.managementRouter);
  adminRouter.use(inputRouter.inputRouter);
  adminRouter.use(deleteRouter.deleteRouter);
  adminRouter.use(searchRouter.searchRouter);
  adminRouter.use(sortingRouter.sortingRouter);
  return adminRouter;
}
