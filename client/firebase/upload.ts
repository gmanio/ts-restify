import * as firebase from 'firebase';

const initiailize = () => {
  const config = {
    apiKey: "AIzaSyBvSlnkuiWfNkS19raUIYDldAEbCIdJK2I",
    authDomain: "mycdn-e1987.firebaseapp.com",
    databaseURL: "https://mycdn-e1987.firebaseio.com",
    projectId: "mycdn-e1987",
    storageBucket: "mycdn-e1987.appspot.com",
    messagingSenderId: "797624103533"
  };

  firebase.initializeApp(config);
}

const upload = (file) => {
  const storageRef = firebase.storage().ref();
  const uploadTask = storageRef.child('/test').put(file);

  uploadTask.on('state_changed', (snapshot: any) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch ( snapshot.state ) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, (error) => {
    // Handle unsuccessful uploads
    console.log(error);
  }, () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    const downloadURL = uploadTask.snapshot.downloadURL;
    console.log(downloadURL);
  });
}


export { initiailize, upload }