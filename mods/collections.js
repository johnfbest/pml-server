import { ObjectId } from "mongodb";

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
    }
}

export { collections };