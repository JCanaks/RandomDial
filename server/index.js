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

app.use((err, req, res) => res.status(500).json({
  message: 'Internal Server error',
}));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to RandomDail, your Simple Random Phone Number Generator',
  });
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server started on port ${port}`));
