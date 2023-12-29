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

module.exports.runResourQuery = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query("select resource_id, resource_name, STRING_AGG(project_id::text, ',') as project_id, STRING_AGG(DISTINCT project_assigned, ', ') AS project_names, STRING_AGG(time_on_project, ', ') AS time_on_project, STRING_AGG(time_off_project, ', ') as time_off_project, STRING_AGG(skill_learned_learning, ', ') as skill_learned_learning from resources group by resource_name, resource_id;");
    client.release();
    return result.rows;
  } catch (error) {
    console.error("Error during query:", error);
    throw error;
  }
};
