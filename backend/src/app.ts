import express, { Application } from "express";
import burritoRoutes from './routes/burrito';
import accountRoutes from './routes/order';

const app: Application = express();
const port = 5001;

const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/burritos', burritoRoutes);
app.use('/api/orders', accountRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
