const mysql =  require('mysql2')

const dotenv =  require('dotenv');


dotenv.config()



const db =  mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password : process.env.password,
    database:process.env.database,
    port:process.env.port

});


db.connect((err)=>{
   if (err) {
     console.log("error in conect ",err)
     return;
   }
   console.log("connect succeell");
});


const queries = {
    insertUserData: "INSERT INTO tbl_users (s_username, s_password_hash) VALUES (?, ?)",
    viewUserData: "SELECT * FROM tbl_users WHERE s_username = ? AND s_password_hash = ?"
};

module.exports = {db,queries};


