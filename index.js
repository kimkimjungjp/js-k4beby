// Import stylesheets
import './style.css';
import liff from '@line/liff';
import { initializeApp } from '@firebase/app';
import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
  remove,
} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDJwCLqPHgiDBfzgUsDhH-OQW83XMTeVEc',
  authDomain: 'fir-da781.firebaseapp.com',
  databaseURL:
    'https://fir-da781-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'fir-da781',
  storageBucket: 'fir-da781.appspot.com',
  messagingSenderId: '582157783169',
  appId: '1:582157783169:web:5c2465d0e093cc41537d80',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const appDiv = document.getElementById('app');
const appDes = document.getElementById('description');
const appDes2 = document.getElementById('description2');
const appimg = document.getElementById('profileimg');
const appid = document.getElementById('id');
const appname = document.getElementById('name');
const appmsg = document.getElementById('msg');
const appemail = document.getElementById('email');
appDiv.innerHTML = 'Test App';
const db = getDatabase();

var enterID = document.querySelector('#enterID');
var enterName = document.querySelector('#enterName');
var enterAge = document.querySelector('#enterAge');
var findID = document.querySelector('#findID');
var findName = document.querySelector('#findName');
var findAge = document.querySelector('#findAge');

var insertBtn = document.querySelector('#insert');
var updateBtn = document.querySelector('#update');
var removeBtn = document.querySelector('#remove');
var findBtn = document.querySelector('#find');

function InsertData() {
  set(ref(db, 'People/' + enterID.value), {
    Name: enterName.value,
    ID: enterID.value,
    Age: enterAge.value,
  })
    .then(() => {
      alert('Data added successfully');
    })
    .catch((error) => {
      alert(error);
    });
}

function FindData() {
  const dbref = ref(db);

  get(child(dbref, 'People/' + findID.value))
    .then((snapshot) => {
      if (snapshot.exists()) {
        findName.innerHTML = 'Name: ' + snapshot.val().Name;
        findAge.innerHTML = 'Age: ' + snapshot.val().Age;
      } else {
        alert('No data found');
      }
    })
    .catch((error) => {
      alert(error);
    });
}

function UpdateData() {
  update(ref(db, 'People/' + enterID.value), {
    Name: enterName.value,
    Age: enterAge.value,
  })
    .then(() => {
      alert('Data updated successfully');
    })
    .catch((error) => {
      alert(error);
    });
}

function RemoveData() {
  remove(ref(db, 'People/' + enterID.value))
    .then(() => {
      alert('Data deleted successfully');
    })
    .catch((error) => {
      alert(error);
    });
}

insertBtn.addEventListener('click', InsertData);
updateBtn.addEventListener('click', UpdateData);
removeBtn.addEventListener('click', RemoveData);
findBtn.addEventListener('click', FindData);
async function main() {
  liff.ready.then(() => {
    appDes.innerHTML =
      liff.getOS() + ' | ' + liff.isInClient() + ' | ' + liff.isLoggedIn();

    if (liff.isInClient()) {
      getprofileUser();
    }
  });
  await liff.init({ liffId: '2000500288-gmvKlRVP' });
}
main();

async function getprofileUser() {
  const profile = await liff.getProfile();
  appimg.innerHTML =
    '<img src="' + profile.pictureUrl + '" style="width:100%;">';
  appid.innerHTML = '<span>UserId : </span>' + profile.userId;
  appname.innerHTML = '<span>Name : </span>' + profile.displayName;
  appmsg.innerHTML = '<span>Status : </span>' + profile.statusMessage;
}
