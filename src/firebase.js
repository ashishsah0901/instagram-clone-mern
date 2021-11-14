import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBPs_XBtc2bPq038iFcbFjaJvjN13P6OhU",
    authDomain: "instagram-clone-66639.firebaseapp.com",
    databaseURL:
        "https://instagram-clone-66639-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "instagram-clone-66639",
    storageBucket: "instagram-clone-66639.appspot.com",
    messagingSenderId: "61516724191",
    appId: "1:61516724191:web:071762eeeb7ff768a7366a",
    measurementId: "G-GDXBPJK79M",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, storage, db };
