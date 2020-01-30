import express from 'express';
const app = express();
const API_PORT = process.env.API_PORT || 1234

app.get('/', (req, res) => {
  res.send(`ok ${API_PORT}`);
  console.log(API_PORT)
});

app.listen(API_PORT, () => console.log('connected to server'));
