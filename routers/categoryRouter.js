const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/create", categoryController.createCategoryForm);
categoryRouter.post("/create", categoryController.postCategory);
categoryRouter.get("/:id", categoryController.getItemsByCategory);
categoryRouter.get("/update/:id", categoryController.updateCategoryForm);
categoryRouter.post("/update/:id", categoryController.updateCategory);
categoryRouter.post("/delete/:id", categoryController.deleteCategory);

module.exports = categoryRouter;
