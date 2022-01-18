import { createConnection } from "typeorm";
import DatabaseConnectionError from "../errors/database-connection.error";

async function connectionToDB() {
  try {
    await createConnection();
    console.log('successfully connected to database')
    
  } catch (error:any) {
      throw new DatabaseConnectionError(error.message)
  }
}

export { connectionToDB }