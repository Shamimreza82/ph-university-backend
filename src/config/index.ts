import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const envFile = {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  data_base_url: process.env.DATABASE_URL,
  default_password: process.env.DEFAULT_PASS,
  salt_round_pass: process.env.SALT_ROUND_PASS, 
  jwt_access_secret: process.env.JWT_ACCESS_SECRET, 
};
