import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from './constants';
import { getStorage, ref, uploadBytesResumable, getDownloadURL,  } from "firebase/storage";




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.API_KEY,
  authDomain: Constants.AUTH_DOMAIN,
  projectId: Constants.PROJECT_ID,
  storageBucket: Constants.STORAGE_BUCKET,
  messagingSenderId: Constants.MESSAGING_SENDER_ID,
  appId: Constants.API_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const database = getFirestore(app);


const uploadToFirebase = async (uri, fileName, bucket, onProgress) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();
  const imageRef = ref(getStorage(), `${bucket}/${fileName}`);
  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata
        });
      }
    );
  });
}



export { 
  app, 
  // auth, 
  database, 
  uploadToFirebase };