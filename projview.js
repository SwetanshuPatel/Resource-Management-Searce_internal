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

module.exports.runProjQuery = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query("select STRING_AGG(project_id::text, ', ') as project_id, project_name, STRING_AGG(project_stage, ', ') as project_stage, STRING_AGG(delivery_date, ', ') as delivery_date, STRING_AGG(resource_id::text, ', ') as resource_id, STRING_AGG(resource_name, ', ') as resource_name, STRING_AGG(region, ', ') as region, STRING_AGG(budget::text, ', ') as budget, STRING_AGG(start_date, ', ') as start_date from projects group by project_name;");
    client.release();
    return result.rows;
  } catch (error) {
    console.error("Error during query:", error);
    throw error;
  }
};
