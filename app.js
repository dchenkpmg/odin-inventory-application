require("dotenv").config();
const express = require("express");
const app = express();
const categoryRouter = require("./routers/categoryRouter");
const itemRouter = require("./routers/itemRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/categories", categoryRouter);
app.use("/", itemRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
