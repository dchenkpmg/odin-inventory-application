const pool = require("./pool");

async function getAllCategories() {
  const query = "SELECT * FROM genres ORDER BY genre";
  const { rows } = await pool.query(query);
  return rows;
}

async function getItemsByCategory(categoryId) {
  const query = `
  SELECT
    games.id AS game_id,
    games.game AS game_name
  FROM games
  JOIN games_genres ON games.id = games_genres.game_id
  JOIN genres ON games_genres.genre_id = genres.id
  WHERE genres.id = $1
  `;
  const { rows } = await pool.query(query, [categoryId]);
  return rows;
}

async function getCategoryName(categoryId) {
  const query = "SELECT genre FROM genres WHERE id = $1";
  const { rows } = await pool.query(query, [categoryId]);
  return rows[0].genre;
}

async function createCategory(name) {
  const query = "INSERT INTO genres (genre) VALUES ($1)";
  await pool.query(query, [name]);
}

async function updateCategory(categoryId, name) {
  const query = "UPDATE genres SET genre = $1 WHERE id = $2";
  await pool.query(query, [name, categoryId]);
}

async function deleteCategory(categoryId) {
  const query = "DELETE FROM genres WHERE id = $1";
  await pool.query(query, [categoryId]);
}

module.exports = {
  getAllCategories,
  getItemsByCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryName,
};
