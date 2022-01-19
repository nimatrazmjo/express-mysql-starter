// Those first two require are very important - without them the typescript migrations did not work for me.
// See https://github.com/facebook/jest/issues/10178

// tslint:disable-next-line: no-var-requires
require("ts-node/register")
require("tsconfig-paths/register")
import "dotenv/config"
import { connectionToDB } from "src/config/database"
import { ConnectionOptions } from "typeorm"
import { ORMConfig } from "../src/config/ormconfig"

/*
 * This file is executed by Jest before running any tests.
 * We drop the database and re-create it from migrations every time.
 */
export default async () => {
  // Force dropping the schema so that test run clean every time.
  // Note that we are not cleaning *between* tests.
  const testOrmConfig: ConnectionOptions = {
    ...(ORMConfig() as ConnectionOptions)
  }

  const t0 = Date.now()
  const connection = await connectionToDB(testOrmConfig)
  const connectTime = Date.now()
  const migrationTime = Date.now()
  console.log(
    ` 👩‍🔬 Connected in ${connectTime -
      t0}ms - Executed migrations in ${migrationTime - connectTime}ms.`
  )
}