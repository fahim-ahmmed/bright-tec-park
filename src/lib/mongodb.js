import { MongoClient } from 'mongodb';

// One MongoClient per server process (survives hot-reload in dev).
export function getMongoClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set. Copy .env.example to .env.local.');
  if (!globalThis._bengalMongoClient) {
    globalThis._bengalMongoClient = new MongoClient(uri);
  }
  return globalThis._bengalMongoClient;
}

export function getDb() {
  return getMongoClient().db(process.env.MONGODB_DB || undefined);
}
