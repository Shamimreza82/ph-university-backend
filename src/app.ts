
import express, { Request, Response } from 'express';
import globalErrorHandler from './app/middelwares/globalErrorHandler';
import notFound from './app/middelwares/notFound';
import router from './app/routes';


const app = express();

app.use(express.json());

app.use('/api/v1', router);



app.get('/', async (req: Request, res: Response) => {
  res.json('hello World');
});

/////global error handler
app.use(globalErrorHandler)
app.use(notFound)


export default app;
