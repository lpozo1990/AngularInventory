// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


// Import the functions you need from the SDKs you need
/* import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; */
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* const firebaseConfig = {
  apiKey: "AIzaSyCz--XOAndyN-KN4XUAcM8cnRMsRMd9xQc",
  authDomain: "angular-firebase-crud-6397a.firebaseapp.com",
  projectId: "angular-firebase-crud-6397a",
  storageBucket: "angular-firebase-crud-6397a.appspot.com",
  messagingSenderId: "1006211428967",
  appId: "1:1006211428967:web:792fcfc3e0802aebe71ac2",
  measurementId: "G-93W2DKXLXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); */

export const environment = {
  firebase: {
    projectId: 'angular-firebase-crud-6397a',
    appId: '1:1006211428967:web:792fcfc3e0802aebe71ac2',
    storageBucket: 'angular-firebase-crud-6397a.appspot.com',
    apiKey: 'AIzaSyCz--XOAndyN-KN4XUAcM8cnRMsRMd9xQc',
    authDomain: 'angular-firebase-crud-6397a.firebaseapp.com',
    messagingSenderId: '1006211428967',
    measurementId: 'G-93W2DKXLXJ',
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
