import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    Port: process.env.DEV_PORT,
   
  },
  test: {
    Port: process.env.TEST_PORT,
 
  }
}
const currentConfig = config[process.env.NODE_ENV];

export {currentConfig as default}