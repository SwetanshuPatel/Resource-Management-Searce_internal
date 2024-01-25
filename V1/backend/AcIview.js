const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports.runAcIQuery = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM action_item order by action_item_id asc");
    client.release();
    return result.rows;
  } catch (error) {
    console.error("Error during query:", error);
    throw error;
  }
};
