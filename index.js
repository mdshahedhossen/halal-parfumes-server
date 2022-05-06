const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port=process.env.PORT || 5000;

const app=express()

//midleware
app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('this is halal perfumes server')
})
app.listen(port,()=>{
    console.log('Crud server is running',port)
})