const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "rahasia",
  database: "kanban",
  port: 5432
});

module.exports = pool;