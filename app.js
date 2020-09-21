const express = require("express"),
  app = express(),
  morgan = require("morgan");

app.set("port", process.env.PORT || 3000);

app.use(morgan(":method :url :status * :response-time ms"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});
app.get("/game", (req, res) => {
  res.sendFile("./views/game.html", { root: __dirname });
});
app.get("/end", (req, res) => {
  res.sendFile("./views/end.html", { root: __dirname });
});

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
