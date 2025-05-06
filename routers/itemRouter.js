const { Router } = require("express");
const itemController = require("../controllers/itemController");
const itemRouter = Router();

itemRouter.get("/", itemController.getAllItems);
itemRouter.get("/create", itemController.createItemForm);
itemRouter.post("/create", itemController.postItem);
itemRouter.get("/update/:id", itemController.updateItemForm);
itemRouter.post("/update/:id", itemController.updateItem);
itemRouter.post("/delete/:id", itemController.deleteItem);

module.exports = itemRouter;
