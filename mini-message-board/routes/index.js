var express = require("express");
var router = express.Router();

const messages = [
  {
    text: "See more code at github.com/foolmonkey",
    user: "Andy T",
    added: new Date(),
  },
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

router.post("/new", function (req, res, next) {
  messages.push({
    text: req.body.messageText,
    user: req.body.messageAuthor,
    added: new Date(),
  });

  res.redirect("/");
});

module.exports = router;
