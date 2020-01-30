import * as express from 'express';
const app: express.Application = express();

app.get('/', (req, res) => {
  res.send('ok');
});

app.listen(1234, () => console.log('connected to server'));
