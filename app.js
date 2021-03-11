var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//Par hacer lo de express

var indexRouter = require("./routes/index");
var messagesRouter = require("./routes/messages");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/chat/api/messages", messagesRouter);



app.listen(3000, () => {
  console.log("Listening on port 3000");
});

module.exports = app;
