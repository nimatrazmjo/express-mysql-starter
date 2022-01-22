import { getConnection } from "typeorm";
import { app } from "../src/app";
import { connectionToDB } from "../src/config/database";
let connection;
beforeAll(async () => {
  process.env.TYPEORM_DATABASE = 'ambassador_test';
  await connectionToDB();
  connection = getConnection();
  console.log('database connected');
  
  
});

beforeEach(async () => {
  const entities = getConnection().entityMetadatas;

  for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name); // Get repository
      await repository.clear(); // Clear each entity table's content
  }
});
afterAll(async () => {
  await getConnection().close();
  console.log('database disconnected');
});
