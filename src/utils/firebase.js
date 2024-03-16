const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage")

const firebaseConfig = {
    apiKey: "AIzaSyDvX9hxB02QzzU_y77zcyagT04OpASztyU",
    authDomain: "school-jdiyorbek.firebaseapp.com",
    projectId: "school-jdiyorbek",
    storageBucket: "school-jdiyorbek.appspot.com",
    messagingSenderId: "143008922499",
    appId: "1:143008922499:web:a1a756d53f3a67522e54b6"
};

initializeApp(firebaseConfig);
const storage = getStorage()

module.exports = storage