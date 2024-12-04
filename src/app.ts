
import express from 'express';
import globalErrorHandler from './app/middelwares/globalErrorHandler';
import notFound from './app/middelwares/notFound';
import router from './app/routes';


const app = express();

app.use(express.json());

app.use('/api/v1', router);


// const test =  (req: Request, res: Response) => {

// };

// app.use('/', test)

/////global error handler
app.use(globalErrorHandler)
app.use(notFound)


export default app;
