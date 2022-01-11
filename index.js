const express = require('express')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;
const connectToMongo = require('./db');
// For cors error
const cors = require('cors')
const bodyParser = require('body-parser');

connectToMongo();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors());
// app.use(express.json({limit: '10mb'}));

app.get('/', (req, res) => {
  res.send('This is Home Page');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/item', require('./routes/item'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/products', require('./routes/products'));

if(process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(port, () => {
  console.log(`Shopsy app listening at http://localhost:${port}`)
})