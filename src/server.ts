import express from 'express';
import router from './routes/index';
import errorHandler from './middleware/errorHandler';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(router);

app.use(errorHandler);


export default app;



