var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var exphbs = require("express-handlebars");
var datefns = require("date-fns");

var indexRouter = require("./routes/index");
var newRouter = require("./routes/new");

var app = express();

// handlebars helper functions
const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),

  // helpers
  helpers: {
    dateformat: function (aDate) {
      return datefns.formatDistanceToNow(aDate, {
        includeSeconds: true,
        addSuffix: true,
      });
    },
  },
});

// view engine setup
app.engine("handlebars", hbs.engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/new", newRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
