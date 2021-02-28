import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import { proxyRefs } from 'vue';

var firebaseConfig = {
  apiKey: 'AIzaSyAWzu3Jcw4Q6dGWEywpteKP6Hi1FC_GENQ',
  authDomain: 'admin-panel-5baec.firebaseapp.com',
  databaseURL: 'https://admin-panel-5baec-default-rtdb.firebaseio.com',
  projectId: 'admin-panel-5baec',
  storageBucket: 'admin-panel-5baec.appspot.com',
  messagingSenderId: '538269401217',
  appId: '1:538269401217:web:9815938c68177c5db34d80',
  measurementId: 'G-QT0S23D9EW'
}

firebase.initializeApp(firebaseConfig);

class Database {
  writeData(ref, data) {
    firebase.database().ref(ref).set(data);
  }

  listenData(ref, change) {
    const dataRef = firebase.database().ref(ref);
    dataRef.on('value', (snapshot) => {
      const data = snapshot.val();
      change(data);
    });
  }

  listenArray(ref, change, start, length) {
    const dataRef = firebase.database()
        .ref(ref)
        .startAt(null, start.toString())
        .endBefore(null, (start + length).toString());

    dataRef.on('value', (snapshot) => {
      const data = snapshot.val();
      change(data);
    });
  }

  putImage(path, image) {
    let storageRef = firebase.storage().ref();
    let ref = storageRef.child(path);

    ref.put(image).then((snapshot) => {
      // console.log(snapshot)
    });
  }

  getImageUrl(path, callback, triesLeft = 20) {
    let slashIndex = path.lastIndexOf('/') + 1;
    let pointIndex = path.lastIndexOf('.');
    if(path.substr(slashIndex , pointIndex - slashIndex) === 'unnamed') {
      return;
    }

    let storage = firebase.storage();
    let pathReference = storage.ref(path);
    pathReference.getDownloadURL()
      .then(callback)
      .catch((error) => {
        if(triesLeft >= 7) {
          setTimeout(() => {
            this.getImageUrl(path, callback, triesLeft - 1);
          }, 150);
        } else if(triesLeft >= 1) {
          setTimeout(() => {
            this.getImageUrl(path, callback, triesLeft - 1);
          }, 2000);
        } else {
          // console.log(error);
        }
      });
  }

  async getAllImagesAsync(path, callback) {
    let storageRef = firebase.storage().ref();
    let ref = storageRef.child(path);
    let result = await ref.listAll().then(value => value);

    callback(result.items);
  }
}

class DatabaseProxy {
  constructor(database) {
    this.database = database;
    this.imagesCache = {};
  }

  writeData(ref, data) {
    this.database.writeData(ref, data);
  }

  listenData(ref, change) {
    this.database.listenData(ref, change);
  }

  writeArray(ref, data, start, length) {
    this.database.writeArray(ref, data, start, length);
  }

  listenArray(ref, change, start, length) {
    this.database.listenArray(ref, change, start, length);
  }

  putImage(path, image) {
    this.database.putImage(path, image);
  }

  getImageUrl(path, callback, triesLeft = 20) {
    if(this.imagesCache[path] !== undefined) {
      callback(this.imagesCache[path]);
    } else {
      this.database.getImageUrl(path, url => {
        this.imagesCache[path] = url;
        callback(url);
      }, triesLeft);
    }
  }

  getAllImagesAsync(path, callback) {
    this.database.getAllImagesAsync(path, callback);
  }
}

let database = new Database();
let proxy = new DatabaseProxy(database);

export default proxy;
