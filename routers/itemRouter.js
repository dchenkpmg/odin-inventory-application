const { Router } = require("express");
const itemController = require("../controllers/categoryController");
const itemRouter = Router();

// itemRouter.get("/", itemController.getAllItems);
// itemRouter.get("/create", itemController.createitemForm);
// itemRouter.post("/create", itemController.postitem);
// itemRouter.get("/:id", itemController.getItemsByitem);
// itemRouter.get("/update/:id", itemController.updateitemForm);
// itemRouter.post("/update/:id", itemController.updateitem);
// itemRouter.post("/delete/:id", itemController.deleteitem);

module.exports = itemRouter;
