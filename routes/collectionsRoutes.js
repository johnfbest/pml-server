import express, { Router } from 'express';
const router = express.Router();

import { mongo } from '../mods/mongo.js';
import { collections } from '../mods/collections.js';

router.get('/:collection/list', async (req, res) => {
    let collection = mongo.collections[req.params.collection];
    if (collection){   
        let results = await collections.getList(req.params.collection, collection);
        res.json(results);
    } else {
        res.end('No collection');
    }
});

router.get('/library/item', async (req, res) => {
    let id = req.query.id;
    if (!id || id == 'null') res.json({ 'error': 'No ID'});

    let collection = mongo.collections.library;
    if (collection){   
        let results = await collections.getItem(id, collection);
        res.json(results);
    } else {
        res.end('No item in collection');
    }
});

router.post('/search', async (req, res) => {
    try{
        let { params, collection } = req.body;
        
        if (collection){   
            let results = await collections.search(params, collection);
            res.json(results);
        } else {
            res.end('No collection');
        }
    } catch(err) {
        console.error(err);
        res.end('Server Error');
    }
});

router.post('/browse', async (req, res) => {
    try{
        let { letter, collection } = req.body;
        
        if (collection){   
            let results = await collections.browse(letter, collection);
            res.json(results);
        } else {
            res.end('No collection');
        }
    } catch(err) {
        console.error(err);
        res.end('Server Error');
    }
});

export { router as collectionsRouter };

