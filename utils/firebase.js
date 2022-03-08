import { firebaseConfig } from "config";
import { IS_DEV } from "config";
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, signOut } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
  getDoc,
  updateDoc,
  connectFirestoreEmulator,
  collection,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  connectStorageEmulator,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Router, { useRouter } from "next/router";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const writeData = async (collection, path, data) => {
  // set(ref(database, path), data);
  setDoc(doc(db, collection, path), data);
};

const getData = async (collection, path) => {
  if (!collection || !path) return false;

  const snap = await getDoc(doc(db, collection, path));

  if (snap.exists()) {
    return snap.data();
  } else {
    console.log("no such data");
    return false;
  }
};

const updateData = async (collection, path, data) => {
  await updateDoc(doc(db, collection, path), data);
};

const uploadData = (path, file) => {
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);
  return uploadTask;
};

const queryGet = async (game) => {
  const q = query(
    collection(db, "users"),
    where("games", "array-contains", game)
    // limit(100)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot;
};

const signOutLink = () => {
  signOut(auth)
    .then(() => {
      Router.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

if (IS_DEV) {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectStorageEmulator(storage, "localhost", 9199);
}

export {
  db,
  auth,
  writeData,
  getData,
  updateData,
  uploadData,
  queryGet,
  signOutLink,
};
