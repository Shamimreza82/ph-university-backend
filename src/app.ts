
import express, { Request, Response } from 'express';
import { studentRouter } from './app/module/student/student.router';
import { UserRouter } from './app/module/user/user.router';
import globalErrorHandler from './app/middelwares/globalErrorHandler';
import notFound from './app/middelwares/notFound';

const app = express();

app.use(express.json());

app.use('/api/v1/users', UserRouter);
app.use('/api/v1', studentRouter);

app.get('/', async (req: Request, res: Response) => {
  res.json('hello World');
});

/////global error handler
app.use(globalErrorHandler)
app.use(notFound)


export default app;
