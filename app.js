require("dotenv").config();
const express = require("express");
const app = express();
const categoryRouter = require("./routers/categoryRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/categories", categoryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
