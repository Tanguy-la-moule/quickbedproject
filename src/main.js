// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';
import router from './router';
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import firebase from 'firebase';
import firestore from 'firebase/firestore'

Vue.config.productionTip = false
Vue.use(Vuetify, {theme: {primary: '#FF3D00'}})


// Initialize Firebase
var config = {
	apiKey: "AIzaSyD7fIAj4Q0-OCZ6r04Vw_49apjnh1LpNA0",
	authDomain: "quickbedproject.firebaseapp.com",
	databaseURL: "https://quickbedproject.firebaseio.com",
	projectId: "quickbedproject",
	storageBucket: "quickbedproject.appspot.com",
	messagingSenderId: "290806261987"
};
firebase.initializeApp(config);

export const db = firebase.firestore();
export let currentUser = {logged: false, profil: null, data: null};
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
})