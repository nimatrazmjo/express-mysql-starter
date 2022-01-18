import http from 'http';

import { app } from './src/app';
import { connectionToDB } from './src/config/database';

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
const start = async () => {

  await connectionToDB();
  server.listen(PORT,()=>{
    console.info('Node ambassador is listening on port', PORT);
  });
}

start()