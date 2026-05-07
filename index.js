const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world tada :)");
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
  });
});

app.listen(port, "0.0.0.0", () =>
  console.log("> Server is up and running on port : " + port),
);
