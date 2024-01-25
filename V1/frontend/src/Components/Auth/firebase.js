// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfoDGHrmLjSVjFCjaiaTo0YEkOwWrURS4",
  authDomain: "internal-project-17e7f.firebaseapp.com",
  projectId: "internal-project-17e7f",
  storageBucket: "internal-project-17e7f.appspot.com",
  messagingSenderId: "802765180626",
  appId: "1:802765180626:web:5c04d982090cfefa2d670b",
  measurementId: "G-3KRDFF3FL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log(analytics);
// export default firebaseApp;
