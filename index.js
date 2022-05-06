const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port=process.env.PORT || 5000;

const app=express()

//midleware
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.id2nr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('Halal perfumes server connected')
  // perform actions on the collection object
  
  client.close();
});


async function run(){
    try{

    }
    finally{

    }

}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('this is halal perfumes server')
})

app.listen(port,()=>{
    console.log('Crud server is running',port)
})