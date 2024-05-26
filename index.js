
const express =require('express')
const app=express()
var cors = require('cors');
const routes = require('./routes');
app.use(cors());
app.use(express.json())
app.use('/', routes);
var port = process.env.PORT|| 5000;
app.listen(port,()=>{
  console.log("Hello server");
})