import { createConnection } from "typeorm";

async function connectionToDB(connection: string = 'default') {
  try {
    await createConnection(connection);
    console.log('successfully connected to database',connection)
    
  } catch (error:any) {
    console.log(error);
    
      // throw new DatabaseConnectionError(error.message)
  }
}

export { connectionToDB }