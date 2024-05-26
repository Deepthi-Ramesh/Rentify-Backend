
const express =require('express')
const app=express()
var cors = require('cors');
const routes = require('./routes');
app.use(cors({
  origin: 'https://rentify-frontend-coral.vercel.app'
}));
app.use(express.json())
app.use('/', routes);
app.get('/',(req,res)=>{
  res.send("Server is running");
})
var port = process.env.PORT|| 5000;
app.listen(port,()=>{
  console.log("Hello server");
})
