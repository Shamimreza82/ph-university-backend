import app from './app';
import { envFile } from './config';
import mongoose from 'mongoose';

async function main() {
  try {
    mongoose.connect(envFile.data_base_url as string);

    app.listen(envFile.port, async () => {
      console.log(`server is running on port ${envFile.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
