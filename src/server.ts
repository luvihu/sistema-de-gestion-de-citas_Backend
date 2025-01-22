import express from 'express';
import router from './routes/index';
import errorHandler from './middleware/errorHandler';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(router);

app.use(errorHandler);


export default app;



