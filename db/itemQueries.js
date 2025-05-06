const pool = require("./pool");

async function getAllItems() {
  const query = "SELECT * FROM games ORDER BY game";
  const { rows } = await pool.query(query);
  return rows;
}

async function getItemCategories() {
  const query = `
    SELECT * FROM genres;
    `;
  const { rows } = await pool.query(query);
  return rows;
}

async function createItem(game, categories) {
  const insertItemQuery = "INSERT INTO games (game) VALUES ($1) RETURNING id";
  const insertCategoriesQuery = `
    INSERT INTO games_genres (game_id, genre_id)
    SELECT $1, unnest($2::int[]);
  `;
  const res = await pool.query(insertItemQuery, [game]);
  const game_id = res.rows[0].id;
  await pool.query(insertCategoriesQuery, [game_id, categories]);
}

async function updateItem(id, game, categories) {
  const updateGameQuery = `
    UPDATE games SET game = $1 WHERE id = $2;
  `;
  const deleteCategoriesQuery = `
    DELETE FROM games_genres WHERE game_id = $1;
  `;
  const insertCategoriesQuery = `
    INSERT INTO games_genres (game_id, genre_id)
    SELECT $1, unnest($2::int[]);
  `;

  await pool.query(updateGameQuery, [game, id]);
  await pool.query(deleteCategoriesQuery, [id]);
  await pool.query(insertCategoriesQuery, [id, categories]);
}

async function deleteItem(id) {
  const query = "DELETE FROM games WHERE id = $1";
  await pool.query(query, [id]);
}

module.exports = {
  getAllItems,
  getItemCategories,
  createItem,
  updateItem,
  deleteItem,
};
