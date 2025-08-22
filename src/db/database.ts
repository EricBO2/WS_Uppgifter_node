import { Db, MongoClient, ServerApiVersion } from "mongodb";
import { validateSecret } from "../security/validateEnv.js";

// Runtime-Validation
const uri: string = validateSecret(process.env.DB_CONNECTION_STRING);
const dbName: string = validateSecret(process.env.DB_NAME);
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
let isConnected = false;

/** Attempts to connect to database.
 * Returns a promise.
 * Throws error at failed attempt. */
export async function runDB(): Promise<void> {
  if (isConnected) return; // prevent duplicate connects

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    isConnected = true;
    console.log("Db is pu and running");
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export function getBuiltinModule(): Db {
  if (!isConnected) {
    throw new Error(" Tried to access DB before connectiong");
  }
  return client.db(dbName);
}

export async function closeDB(): Promise<void> {
  await client.close();
  isConnected = false;
  console.log("Mongodb connection closed");
}
