require("./Config/db.connection");
require("dotenv").config({ path: "../.env" });
const cors = require("cors");
const express = require("express");
const path = require("path");
const logger = require("morgan"); // for logging requests , status codes and more.....
const app = express();
const PORT = process.env.PORT;
const { router } = require("./Routes/index");

app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));

// Serve static files from the 'uploads' folder -- temporary
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(logger("dev"));

router(app);
app.listen(PORT, () => {
  console.log(`Server listening on : http://localhost:${PORT}`);
});

module.exports = app;
