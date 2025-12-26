// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD9dhTpmtGSZGcEOR9x18xNE37gn66nrQ",
  authDomain: "skilleduai-65041.firebaseapp.com",
  projectId: "skilleduai-65041",
  storageBucket: "skilleduai-65041.firebasestorage.app",
  messagingSenderId: "1055197518414",
  appId: "1:1055197518414:web:3d09e4868b1ca93841c11f",
  measurementId: "G-M6PSJ66P6E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Error box
const errorBox = document.getElementById("errorBox");

function showMessage(msg, success = false) {
  errorBox.style.display = "block";
  errorBox.textContent = msg;
  if (success) errorBox.classList.add("success");
  else errorBox.classList.remove("success");
}

// LOGIN
document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    showMessage("Please enter both email and password");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      showMessage("Login successful!", true);
      setTimeout(() => {
        window.location.href = "welcome.html";
      }, 1000);
    })
    .catch(err => showMessage(err.message));
});

// SIGNUP
document.getElementById("signupBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    showMessage("Please enter email and password");
    return;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      showMessage("Account created!", true);
      setTimeout(() => {
        window.location.href = "welcome.html";
      }, 1000);
    })
    .catch(err => showMessage(err.message));
});
