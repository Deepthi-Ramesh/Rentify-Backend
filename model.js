const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12708706',
    password:'XKRMDIST2B',
    database:'sql12708706',
    connectTimeout: 10000
})
  
connection.connect((err)=>{
    if(err)
    console.log(err);
    else 
    console.log("you are connected");
    
});

module.exports = {
    connection
}

