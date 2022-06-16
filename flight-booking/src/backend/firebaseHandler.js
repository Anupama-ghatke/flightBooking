import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDVm9l62FybgAmk2doXQCOox1XyLgqQWzo",
  authDomain: "flightbook-6c457.firebaseapp.com",
  databaseURL: "https://flightbook-6c457-default-rtdb.firebaseio.com",
  projectId: "flightbook-6c457",
  storageBucket: "flightbook-6c457.appspot.com",
  messagingSenderId: "772335892139",
  appId: "1:772335892139:web:40a0b3485d15ab35c769ee",
  measurementId: "G-RFQ0EL2QE0"
};


const app = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(app);
export const firebaseAuth = getAuth(app)