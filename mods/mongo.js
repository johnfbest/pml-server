import { MongoClient } from 'mongodb';

const mongo = {
    // Connection to client
    client: new MongoClient(process.env.MONGO_DB_URL),
    connect: async _=> {
        console.log(`Connecting to ${ process.env.MONGO_DB_URL }`);
        await mongo.client.connect();
        console.log('Connected successfully to server');
    },

    close: _=> {
        client.close();
    }
}

const init = async _=> {
    await mongo.connect();
    mongo.db = mongo.client.db(process.env.MONGO_DB_NAME);
    let collections = await mongo.db.listCollections().toArray();
    
    mongo.collections = {};
    collections.forEach( c => {
        console.log(`Loading Collectioni: ${ c.name }`);
        mongo.collections[c.name] = mongo.db.collection(c.name);
    });

    console.log('Loaded collections');
};

init().catch(console.error);

export { mongo };