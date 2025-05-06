const db = require("../db/categoryQueries");

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("categories/categories", {
    title: "Genres",
    categories: categories,
  });
}

async function getItemsByCategory(req, res) {
  const categoryId = req.params.id;
  const items = await db.getItemsByCategory(categoryId);
  const category = await db.getCategoryName(categoryId);
  res.render("categories/items", {
    title: category,
    items,
  });
}

async function createCategoryForm(req, res) {
  res.render("categories/create", {
    title: "Create Genre",
  });
}

async function postCategory(req, res) {
  const { genre } = req.body;
  await db.createCategory(genre);
  res.redirect("/categories");
}

async function updateCategoryForm(req, res) {
  const categoryId = req.params.id;
  res.render("categories/update", {
    title: "Update Genre",
    categoryId: categoryId,
  });
}

async function updateCategory(req, res) {
  const categoryId = req.params.id;
  const { genre } = req.body;
  await db.updateCategory(categoryId, genre);
  res.redirect("/categories");
}

async function deleteCategory(req, res) {
  const categoryId = req.params.id;
  await db.deleteCategory(categoryId);
  res.redirect("/categories");
}

module.exports = {
  getAllCategories,
  getItemsByCategory,
  postCategory,
  updateCategory,
  deleteCategory,
  createCategoryForm,
  updateCategoryForm,
};
