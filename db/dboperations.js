const sqlite3 = require('sqlite3');

let db = new sqlite3.Database("db.sqlite3");



function createTables(){
   let sql = `CREATE TABLE IF NOT EXISTS "user" (
        "id"	INTEGER,
        "name"	TEXT,
        "mobile"	NUMERIC UNIQUE,
        "email"	TEXT UNIQUE,
        "password"	TEXT,
        PRIMARY KEY("id" AUTOINCREMENT)
    )`;

    db.exec(sql,(err)=>{
        console.log(err);
    })

    
}


module.exports = db;