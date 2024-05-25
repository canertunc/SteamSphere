import mysql from "mysql2"

// create the connection to database
const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"1907",
    database:"steam_data"
});

export default db;