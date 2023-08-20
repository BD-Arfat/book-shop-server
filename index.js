const express = require("express");
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hi hello")
});
app.use(cors());
app.use(express.json());

// book-shop
// Qmm0NJZgYC9TNSjk

//////////////////////


const uri = "mongodb+srv://book-shop:Qmm0NJZgYC9TNSjk@cluster0.s0vwyit.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();



    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");


    const productCollection = client.db('book').collection('products');
    const ordersCollection = client.db('book').collection('order');


    app.get('/product', async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query).limit(4);
      const products = await cursor.toArray();
      res.send(products)
    });
    app.get('/products', async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products)
    });

    // app.get('/products/:id', async(req,res)=>{
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };
    //   const order = await productCollection.findOne(query);
    //   res.send(order)
    // })

    app.delete('/addProduct/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await productCollection.deleteOne(query);
      res.send(result)
      console.log(result) 
    })

    app.post('/addProduct', async (req, res) => {
      const user = req.body;
      const result = await productCollection.insertOne(user);
      res.send(result)
    });

    app.get('/addProduct/:id', async(req, res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const order = await productCollection.findOne(query);
      res.send(order)
    })
    app.get('/addProduct', async(req, res)=>{
      const email = req.query.email;
      const query = {email : email};
      const result = await productCollection.find(query).toArray();
      res.send(result)
    })

    

    app.post('/orders', async (req, res) => {
      const user = req.body;
      const result = await ordersCollection.insertOne(user);
      res.send(result)
    });

    app.get('/orders', async (req, res) => {
      const query = {};
      const cursor = ordersCollection.find(query);
      const users = await cursor.toArray();
      res.send(users)
    });
    app.get('/order', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await ordersCollection.find(query).toArray();
      res.send(result)
    });

    app.get('/order/:id', async(req,res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const order = await ordersCollection.findOne(query);
      res.send(order)
    })

    app.delete('/order/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await ordersCollection.deleteOne(query);
      res.send(result)
      console.log(result)
    });

    app.get('/products/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.findOne(query);
      res.send(result)
  });


    app.put('/products/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const user = req.body;
      const options = { upsert: true };
      const updateduser = {
          $set: {
              name: user.name,
              Published: user.Published,
              image: user.image,
              price: user.price,
              Genre: user.Genre,
              Author: user.Author,
          }
      }
      const result = await productCollection.updateOne(filter, updateduser, options);

      res.send(result)
  })


    


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


//////////////////////

app.listen(port, () => {
  console.log(`hi hello ${port}`)
})