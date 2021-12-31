import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { collectionsRouter } from './routes/collectionsRoutes.js';

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/collections', collectionsRouter);

app.listen(port, () => {
  console.log(`PML Server listening on ${port}`)
})