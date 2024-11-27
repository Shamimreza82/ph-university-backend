import express, { Request, Response } from 'express';
import { studentRouter } from './app/module/student/student.router';
import { UserRouter } from './app/module/user/user.router';
 const app = express();

app.use(express.json());



app.use('/api/v1/users', UserRouter)
app.use('/api/v1', studentRouter)


app.get('/', async (req: Request, res: Response) => {
  res.json('hello World');
});




export default app
