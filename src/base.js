import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyCgFIxbvNRllAvJ_zApzwY9GrhlgWeCkLk",
        authDomain: "brainy-actz-cms.firebaseapp.com",
        databaseURL: "https://brainy-actz-cms.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};
export default base;