
import express from 'express';
import globalErrorHandler from './app/middelwares/globalErrorHandler';
import notFound from './app/middelwares/notFound';
import router from './app/routes';


const app = express();

app.use(express.json());

app.use('/api/v1', router);


// const test = async (req: Request, res: Response) => {
//     Promise.reject()
//  res.send("test route")
// };

// app.use('/', test)

/////global error handler
app.use(globalErrorHandler)
app.use(notFound)


export default app;
