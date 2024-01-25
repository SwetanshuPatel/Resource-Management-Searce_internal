require("dotenv").config();

const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
});

async function verifyUser(username, password) {
  const query = `
    SELECT COUNT(*) FROM users
    WHERE name = $1 AND password = $2
  `;
  const data = await pool.query(query, [username, password]);

  return data.rows[0].count > 0;
}

// If you want to use command-line input for username and password:
// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const getUsername = () => {
//   return new Promise((resolve) => {
//     rl.question("Enter Username:", (username) => {
//       resolve(username);
//     });
//   });
// };

// const getPassword = () => {
//   return new Promise((resolve) => {
//     const password = require("readline-sync").question("Enter Password:", {
//       hideEchoBack: true,
//     });
//     resolve(password);
//   });
// };

// To get the username and password from the exported formData in Signup.jsx:
const { formData } = require("../frontend/src/Components/Auth/Signup.jsx");

(async function () {
  const isUserVerified = await verifyUser(formData.username, formData.password);

  if (isUserVerified) {
    console.log("Login verified.");
  } else {
    console.log("Login not verified.");
  }

  // If you were using command-line input, you would get username and password like this:
  // const username = await getUsername();
  // const password = await getPassword();
})();
