import { createConnection } from "typeorm";
import {createClient} from "redis";


const client = createClient({
    url: 'redis://localhost:6379'
});

async function connectionToDB(connection: string = 'default') {
  try {
    await client.connect();
    await createConnection(connection);
    console.log('successfully connected to database',connection)
    
  } catch (error:any) {
    console.log(error);
    
      // throw new DatabaseConnectionError(error.message)
  }
}



export { connectionToDB, client }