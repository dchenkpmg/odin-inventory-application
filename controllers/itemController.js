const db = require("../db/itemQueries");

async function getAllItems(req, res) {
  const items = await db.getAllItems();
  res.render("items/items", {
    title: "Items",
    items: items,
  });
}

async function createItemForm(req, res) {
  res.render("items/create", {
    title: "Create Item",
    categories: await db.getItemCategories(),
  });
}

async function postItem(req, res) {
  const { game } = req.body;
  await db.createItem(game);
  res.redirect("/");
}

async function updateItemForm(req, res) {
  const itemId = req.params.id;
  const categories = await db.getItemCategories(itemId);
  res.render("items/update", {
    title: "Update Item",
    categories: categories,
    itemId: itemId,
  });
}

async function updateItem(req, res) {
  const itemId = req.params.id;
  const { game, categories } = req.body;
  await db.updateItem(itemId, game, categories);
  res.redirect("/");
}

async function deleteItem(req, res) {
  const itemId = req.params.id;
  await db.deleteItem(itemId);
  res.redirect("/");
}

module.exports = {
  getAllItems,
  createItemForm,
  postItem,
  updateItemForm,
  updateItem,
  deleteItem,
};
