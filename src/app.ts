
import express from 'express';
import globalErrorHandler from './app/middelwares/globalErrorHandler';
import notFound from './app/middelwares/notFound';
import router from './app/routes';
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(cors({origin: [
    'http://localhost:5173', "http://localhost:5000"
]}))


app.use('/api/v1', router);


app.use(globalErrorHandler)
app.use(notFound)


export default app;
