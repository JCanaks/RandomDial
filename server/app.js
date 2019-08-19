import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to RandomDail, your Simple Random Phone Number Generator',
  });
});

app.use((err, req, res, next) => res.status.json({
  message: 'Internal Server error',
}));

export default app;
