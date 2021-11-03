export const production = false;
export default {
  apiUrl: production
    ? 'https://tic-tac-toe-1337.herokuapp.com/'
    : 'http://localhost:8080/',
  socketUrl: 'http://127.0.0.1:3000/',
  firebaseConfig: {
    apiKey: 'AIzaSyAWBwmQrm7j--gu4smUcxgdhxC0may5Oj0',
    authDomain: 'tic-tac-toe-70f1a.firebaseapp.com',
    projectId: 'tic-tac-toe-70f1a',
    storageBucket: 'tic-tac-toe-70f1a.appspot.com',
    messagingSenderId: '704274868087',
    appId: '1:704274868087:web:d7d4e7b8f652378116a372',
    measurementId: 'G-S72L2271GQ',
  },
  avatarColors: [
    '#003049',
    '#d62828',
    '#f77f00',
    '#fcbf49',
    '#eae2b7',
    '#00b4d8',
    '#3d405b',
    '#caffbf',
    '#ef476f',
    '#43aa8b',
    '#00afb9',
    '#f07167',
  ],
};
