// mongodb.js

import { MongoClient } from 'mongodb'

const uri: string = process.env.MONGODB_URI!
console.log({ uri })
const options: any = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

let client: any = null
let clientPromise: any = null

if (!process.env.MONGODB_URI) {
    throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

export default clientPromise