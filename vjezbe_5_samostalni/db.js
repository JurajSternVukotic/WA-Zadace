import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

async function connectToDatabase() {
    try {
    const client = new MongoClient(MONGO_URI); // stvaramo novi klijent
    await client.connect(); // spajamo se na klijent
    console.log('Uspješno spajanje na bazu podataka');
    let db = client.db(MONGO_DB_NAME); // odabiremo bazu podataka
    return db;
    } catch (error) {
    console.error('Greška prilikom spajanja na bazu podataka', error);
    throw error;
    }
    }

    export { connectToDatabase };