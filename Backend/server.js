
const express = require('express')
const dotenv = require('dotenv').config()
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')

// dotenv.config()

// or as an es module:
 import { MongoClient } from 'mongodb'

// Connection URL
//const url = 'mongodb://localhost:27017';
const client = new MongoClient(MONGO_URL);

// Database Name
const dbName = 'SDPASSKEY';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect();


// require('dotenv').config()
// console.log(process.env.MONGO_URI)

//Get all the Passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//Save a Password
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({success: true, result: findResult})
})

//Delete a Password by id
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({success: true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})