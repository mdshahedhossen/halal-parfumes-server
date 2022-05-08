const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port=process.env.PORT || 5000;

const app=express()

//midleware
app.use(cors());
app.use(express.json())

const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.id2nr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const itemCollection=client.db('halalPerfumes').collection('items')

        app.get('/items', async(req,res)=>{
            const query={};
            const cursor=itemCollection.find(query)
            const items=await cursor.toArray();
            res.send(items)
        });

        app.get('/items/:id',async(req,res)=>{
            const id=req.params.id
            const query={_id:ObjectId(id)};
            const item=await itemCollection.findOne(query);
            res.send(item)
        });
        
        //post
        app.post('/items',async(req,res)=>{
            const newItem=req.body;
            const result=await itemCollection.insertOne(newItem)
            res.send(result);

        });

        //Delete
        app.delete('/items/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id:ObjectId(id)};
            const result=await itemCollection.deleteOne(query);
            res.send(result)
        });

        // Update stock quantity
        app.put('/items/:id', async(req, res) => {
            const id = req.params.id;
            const updatePerfumes = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updated = {
                $set: {
                    quantity: updatePerfumes.quantity
                }
            };
            const result = await itemCollection.updateOne(filter, updated, options);
            res.send(result);
        })

        // Deliver items
        app.put('/items/deliver/:id', async (req, res) => {
            const id = req.params.id
            const newQuantity = req.body
            const deliver = newQuantity.quantityUpdate - 1
            const query = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    quantity: deliver
                }
            }

            const result = await itemCollection.updateOne(query, updateDoc, options)
            res.send(result);
        })
        

        // app.get('/items/:email',async(req,res)=>{
        //     const query={emial:req.params.email}
        //     const cursor=itemCollection.find(query);
        //     const result=await cursor.toArray();
        //     res.send(result)
        // })

        
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