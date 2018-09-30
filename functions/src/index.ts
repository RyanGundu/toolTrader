import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

const env = functions.config();

import * as algoliasearch from 'algoliasearch';

const client = algoliasearch(env.algolia.appid,env.algolia.apikey);
const index = client.initIndex('posts_search');

exports.indexPosts = functions.firestore.
document('post/{postID}').
onCreate((snap, context) => {
    const data = snap.data();
    const objectId = snap.id;

    return index.addObject({
        objectId,
        ...data
    });
});


exports.indexPosts = functions.firestore.
document('post/{postID}').
onDelete((snap, context) => {
    const objectId = snap.id;

    return index.deleteObject(objectId);
});

