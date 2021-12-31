import { ObjectId } from "mongodb";
import { mongo } from '../mods/mongo.js';

const listFields = { Title: 1, Composer: 1};

const libraryList = o => {
    
    return o;
    /*
    { 
        id: o._id, 
        title: o.Title ?? o.CollectionTitle
    } 
    */
}

const collections = {
    getList: async (collectionName, collection) => {
        let results;
        switch (collectionName) {
            case 'library':
                results = await collection.find().sort({"Author": 1}).limit(100).toArray();
                return results.map(libraryList);
            default:
                results = await collection.find().toArray();
                return results;
        }
    },
    
    getItem: async (id, collection) => {
        var _id = new ObjectId(id);
        let results = await collection.findOne({ _id });
        return results;
    },

    search: async (params, collection) => {
        let { query, options } = params;
        let coll = mongo.collections[collection];
        if (!coll) return {err: 'No Collection'};

        Object.keys(query).forEach( key => {
            query[key] = new RegExp(query[key], 'i');
        })

        let results = await coll.find(query, options).project(listFields).toArray();
        /*
        let results = await coll.aggregate([
            { 
                "$facet": {
                    "totalData": [
                        { "$match": query},
                        { "$skip": 10 },
                        { "$limit": 10 },
                        
                    ],
                    "totalCount": [
                        { "$count": "count" }
                    ]
                }
            }
        ]);
        */
        return results;

    },

    browse: async (letter, collection) => {
        let coll = mongo.collections[collection];
        if (!coll) return {err: 'No Collection'};
        if (!letter) letter = 'A';

        let query = {
            Title: new RegExp(`\s*^${ letter }`, 'i')
        };

        let results = await coll.find(query).sort({ Title: 1 }).project(listFields).toArray();
        return results;
    }
}

export { collections };