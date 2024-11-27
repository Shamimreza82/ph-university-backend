
import express, {  Request, Response } from 'express';
import { studentRouter } from './app/module/student/student.router';
import { UserRouter } from './app/module/user/user.router';
import { error } from 'console';

const app = express();

app.use(express.json());

app.use('/api/v1/users', UserRouter);
app.use('/api/v1', studentRouter);

app.get('/', async (req: Request, res: Response) => {
  res.json('hello World');
});



/////global error handler




app.use((err: any, req:Request, res:Response, next: NextFunction) =>{
 const statusCode = 500 
 const message = err.message || "Something went wrong"

 return res.status(statusCode).json({
  success: false, 
  message: message,
  error: err, 
  stack: err.stack 

 })

})

export default app;
