import express from 'express';
import 'reflect-metadata';
import './database/connect';
import cors from 'cors';
import 'dotenv';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server is running...');
});
