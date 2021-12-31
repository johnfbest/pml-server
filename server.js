import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { collectionsRouter } from './routes/collectionsRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static('/www'));

app.use('/collections', collectionsRouter);

let server_port = process.env.PORT;
let server_host = '0.0.0.0';

app.listen(server_port, server_host, _=> {
    console.log('PML Server listening on Port %d', server_port);
});