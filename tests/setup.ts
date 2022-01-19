import { getConnection } from "typeorm";
import { app } from "../src/app";
import { connectionToDB } from "../src/config/database";
let connection;
const CONNECTION_TYPE= 'test';
beforeAll(async () => {
  await connectionToDB(CONNECTION_TYPE);
  connection = getConnection(CONNECTION_TYPE);
  console.log('database connected');
  
  
});

beforeEach(async () => {
  const entities = getConnection(CONNECTION_TYPE).entityMetadatas;

  for (const entity of entities) {
      const repository = getConnection(CONNECTION_TYPE).getRepository(entity.name); // Get repository
      await repository.clear(); // Clear each entity table's content
  }
});
afterAll(async () => {
  await connection.close();
  console.log('database disconnected');
});
