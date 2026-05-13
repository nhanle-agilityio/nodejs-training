import { config } from 'dotenv';
import { resolve } from 'path';

config({
  path: resolve(__dirname, '..', 'devenv', '.env.test'),
  override: true,
});
