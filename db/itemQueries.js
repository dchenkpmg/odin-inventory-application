const pool = require("./pool");

async function getAllItems() {
  const query = "SELECT * FROM games ORDER BY game";
  const { rows } = await pool.query(query);
  return rows;
}

async function createItem(game) {
  const query = "INSERT INTO games (game) VALUES ($1)";
  await pool.query(query, [game]);
}

async function updateItem(id, game) {
  const query = "UPDATE games SET game = $1 WHERE id = $2";
  await pool.query(query, [game, id]);
}

async function deleteItem(id) {
  const query = "DELETE FROM games WHERE id = $1";
  await pool.query(query, [id]);
}

module.exports = {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
};
