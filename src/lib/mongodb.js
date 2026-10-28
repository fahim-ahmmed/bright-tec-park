
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error(
    'MONGODB_URI is not set. Please configure it in .env.local.'
  );
}

const globalWithMongo = globalThis;

const clientPromise =
  globalWithMongo._bengalMongoClientPromise ??
  (globalWithMongo._bengalMongoClientPromise = new MongoClient(
    uri,
    options
  ).connect());

export async function getMongoClient() {
  return clientPromise;
}

export async function getDb() {
  const client = await getMongoClient();
  const dbName = process.env.MONGODB_DB;

  return dbName ? client.db(dbName) : client.db();
}
