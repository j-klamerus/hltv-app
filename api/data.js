import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

// Cache the MongoDB client connection in the global scope
// This is crucial for performance and avoiding hitting connection limits
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
}
let client;
 if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set.');
    }
    try {
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        cachedClient = client;
        cachedDb = client.db('your_database_name'); // REPLACE with your database name
        console.log('Connected to MongoDB');
        return { client: cachedClient, db: cachedDb };
    } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error; // Re-throw to be caught by the main handler
  }
}

export default async function handler(req, res) {
  const {name} = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Player ID is required' });
  }
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection(name);
    // Fetch data from MongoDB
    // You can add queries, sorting, limiting here
    const data = await collection.find({})
                                 .sort({ timestamp: -1 }) // Sort by latest scraped data
                                 .limit(20) 
                                 .toArray();

    res.status(200).json({ success: true, data });
  }catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
}