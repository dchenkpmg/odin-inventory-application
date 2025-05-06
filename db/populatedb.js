#! /usr/bin/env node

const { Client } = require("pg");
const { argv } = require("process");
require("dotenv").config();

const query = `
CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  game VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  genre VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS games_genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  game_id INTEGER NOT NULL,
  genre_id INTEGER NOT NULL,
  FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

INSERT INTO games (game) VALUES ('The Legend of Zelda: Breath of the Wild'), ('Super Mario Odyssey'), ('The Witcher 3: Wild Hunt'), ('Dark Souls III'), ('God of War'), ('Red Dead Redemption 2'), ('Hollow Knight'), ('Celeste'), ('Persona 5'), ('Final Fantasy VII Remake');

INSERT INTO genres (genre) VALUES ('Action'), ('Adventure'), ('RPG'), ('Platformer'), ('Puzzle'), ('Shooter'), ('Fighting'), ('Simulation');

INSERT INTO games_genres (game_id, genre_id) VALUES (1, 1), (1, 2), (2, 1), (2, 4), (3, 3), (4, 1), (5, 1), (6, 2), (7, 4), (8, 4), (9, 3), (10, 3);
`;

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: argv[2] || process.env.DATABASE_URL,
  });
  try {
    await client.connect();
    await client.query(query);
  } catch (err) {
    console.error("Error executing query", err.stack);
  } finally {
    await client.end();
    console.log("Seeding complete.");
  }
}

main();
