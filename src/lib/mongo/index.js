
import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI
const optons = {}

if (!URI) throw new Error('no mongodb URI in .env')

let client = new MongoClient(URI, optons)
let clientPromise

if(process.env.NODE_ENV !== 'production') {
    if(!global._mongoClientPromise) {
        global._mongoClientPromise = client.connect()
    }

    clientPromise = global._mongoClientPromise
} else {
    clientPromise = client.connect()
}

export default clientPromise