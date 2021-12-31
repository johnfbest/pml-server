import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { collectionsRouter } from './routes/collectionsRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static('../web/build'));

app.use('/collections', collectionsRouter);

app.listen(process.env.NODE_PORT, () => {
  console.log(`PML Server listening on ${ process.env.NODE_PORT }`)
});