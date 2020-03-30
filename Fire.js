import * as firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig';
require('firebase/firestore');

import { decode, encode } from 'base-64';
global.crypto = require('@firebase/firestore');
global.crypto.getRandomValues = byteArray => {
    for (let i = 0; i < byteArray.length; i++) {
        byteArray[i] = Math.floor(256 * Math.random());
    }
};

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

class Fire {
    constructor() {
        firebase.initializeApp(firebaseConfig);
    }

    addPost = async ({ text, localUri }) => {
        const remoteUri = await this.uploadPhotoAsync(
            localUri,
            `photos/${this.uid}/${Date.now()}`
        );

        return new Promise((resolve, reject) => {
            this.firestore
                .collection('posts')
                .add({
                    text,
                    uid: this.uid,
                    timestamp: this.timestamp,
                    image: remoteUri
                })
                .then(ref => {
                    console.log('passed at 22 add post');
                    resolve(ref);
                })
                .catch(err => {
                    console.log('line 23 catch block addPost');
                    reject(err);
                });
        });
    };

    uploadPhotoAsync = async (uri, filename) => {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(uri);
            const blob = await response.blob();

            let upload = firebase
                .storage()
                .ref(filename)
                .put(blob);

            upload.on(
                'state_changed',
                snapshot => {},
                err => {
                    console.log('line 46 upload error');
                    reject(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    resolve(url);
                }
            );
        }).catch(e => console.error(e));
    };

    createUser = async user => {
        let remoteUri = null;

        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password);

            let db = this.firestore.collection('users').doc(this.uid);

            db.set({
                name: user.name,
                email: user.email,
                avatar: null
            });
            if (user.avatar) {
                remoteUri = await this.uploadPhotoAsync(
                    user.avatar,
                    `avatars/${this.uid}`
                );

                db.set({ avatar: remoteUri }, { merge: true });
            }
        } catch (e) {
            alert(`Error: ${e}`);
        }
    };

    signOut = () => {
        firebase.auth().signOut();
    };

    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }
}

Fire.shared = new Fire();
export default Fire;
