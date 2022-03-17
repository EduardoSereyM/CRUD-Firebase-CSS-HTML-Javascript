// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";

import { 
    getFirestore, 
    collection, 
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyCM9bPUoj5JKXEtTUkCwb33nm-dWLUu_YI",
authDomain: "fir-javascript-crud-3d593.firebaseapp.com",
projectId: "fir-javascript-crud-3d593",
storageBucket: "fir-javascript-crud-3d593.appspot.com",
messagingSenderId: "870225275951",
appId: "1:870225275951:web:4e5950968359b0103feada"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore();


export const saveTask = (title, description) => 
    addDoc(collection(db, "tasks"), {title, description});

export const getTasks = ()=> getDocs(collection(db, 'tasks'));

export const onGetTask = (callback) => onSnapshot(collection(db, 'tasks'),callback);

export const deleteTask = id => deleteDoc(doc(db, 'tasks', id));

export const getTask = id => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);
