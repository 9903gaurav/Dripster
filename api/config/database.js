const mysql = require("mysql2");

let connectDatabase;
try {
  connectDatabase = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port,
    connectionLimit: 10,
  });

  console.log("Connection pool created successfully.");
  
} catch (error) {
  connectDatabase = err;
  console.error("Error creating connection pool:", err);
}

module.exports = connectDatabase;
