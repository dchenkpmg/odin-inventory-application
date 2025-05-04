const db = require("../db/categoryQueries");

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("categories/categories", {
    title: "Categories",
    categories: categories,
  });
}

async function getItemsByCategory(req, res) {
  const categoryId = req.params.id;
  const items = await db.getItemsByCategory(categoryId);
  res.send(items);
  // res.render("categories/items", {
  //   items,
  // });
}

async function postCategory(req, res) {
  const { name } = req.body;
  await db.createCategory(name);
  res.redirect("/categories");
}

async function updateCategory(req, res) {
  const categoryId = req.params.id;
  const { name } = req.body;
  await db.updateCategory(categoryId, name);
  res.redirect("/categories)");
}

async function deleteCategory(req, res) {
  const categoryId = req.params.id;
  await db.deleteCategory(categoryId);
}

module.exports = {
  getAllCategories,
  getItemsByCategory,
  postCategory,
  updateCategory,
  deleteCategory,
};
