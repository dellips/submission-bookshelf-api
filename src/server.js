import express from 'express';
import routes from './routes.js';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use('/', routes);

app.listen(9000, () => {
 console.log(`Server running at http://localhost:9000`);
});