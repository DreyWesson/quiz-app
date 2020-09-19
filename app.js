const express = require("express"),
  app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + "/public"));
app.use("/views", express.static(__dirname + "/views"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
