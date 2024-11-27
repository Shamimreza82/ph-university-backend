import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const envFile = {
  port: process.env.PORT,
  data_base_url: process.env.DATABASE_URL,
  default_password: process.env.DEFAULT_PASS,
  salt_round_pass: process.env.SALT_ROUND_PASS
};
