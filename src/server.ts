import { Server } from 'http';
import app from './app';
import { envFile } from './config';
import mongoose from 'mongoose';

let server: Server

async function main() {
  try {
    mongoose.connect(envFile.data_base_url as string);

   server = app.listen(envFile.port, async () => {
      console.log(`server is running on port ${envFile.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();


///// handel  unhandledRejection and  uncaughtException error

process.on('unhandledRejection', () => {
  console.log("UnhandledPromiseRejection if deleted, shutting down server ");
  if(server) {
    server.close(()=> {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () => {
  console.log("Uncaught Exception if deleted, shutting down server ");
  process.exit(1)
})



