import "firebase/compat/storage";
import firebase from "firebase/compat/app";

export const uploadFile = (file, filename) => {
  return new Promise((resolve, reject) => {
    if (file) {
      const storageRef = firebase.storage().ref();
      // const type = file?.type.split("/")[1];
      // filename = filename.concat(`.${type}`);
      const fileRef = storageRef.child(filename);

      fileRef
        .put(file)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            resolve(downloadURL);
          });
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      resolve(null);
    }
  });
};

export const deleteFile = (filename) => {
  return new Promise((resolve, reject) => {
    const storageRef = firebase.storage().ref().child(filename);
    storageRef
      .delete()
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteAllFiles = (files) => {
  return new Promise((resolve, reject) => {
    Promise.allSettled(files)
      .then((results) => {
        resolve(results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const uploadAllFiles = (files) => {
  return new Promise((resolve, reject) => {
    Promise.allSettled(files)
      .then((results) => {
        resolve(results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
