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

module.exports.runUtiQuery = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT resource_name, STRING_AGG(DISTINCT project_name, ', ') AS project_names, STRING_AGG(billable_in_percent::text, ', ') AS utilizations, STRING_AGG(utilization_id::text, ', ') AS utilization_id FROM utilization GROUP BY resource_name");
    client.release();
    return result.rows;
  } catch (error) {
    console.error("Error during query:", error);
    throw error;
  }
};
