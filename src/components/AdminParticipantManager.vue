<template>
	<div>
		<div v-for="participant in users" class="container">
			<span class="name">{{participant.firstname}} {{participant.name}}  {{participant.birthdate}}</span>
			<v-btn large class="button" color="primary" @click="quick(participant)">Supprimer l'utilisateur</v-btn>

		</div>
	</div>
</template>

<script>
import firebase from 'firebase';
import { db, currentUser } from '../main';

export default {
  data: function () {
    return {
    	user: firebase.auth().currentUser,
    	users: [],
    	event: null,
    	display: false,
    	loaded: false,
        snackbar: {
			active: false,
			message: "Il manque des informations pour créer l'évenement"
		},
		user: currentUser.profile,
	    userdata: currentUser.data,
    }
  },
  created () {
  	this.user = currentUser.profile;
  	let url = document.location.href.split("?");
  	console.log(url[1]);
  	console.log(this.event)
	if (this.user) {
		db.collection("events").doc(url[1]).get()
		.then((doc) => {
			this.event = doc.data();
			this.event.id = doc.id;			
			this.event.participants.forEach((id) => {
				db.collection("users").doc(id).get()
				.then((doc) => {
					this.users.push(doc.data());
				})
			});
			this.loaded = true;
	})};
	
  },
  methods: {
  	quick: function (participant){
		let newparticipants = [];
		for (var i = 0; i < this.users.length; i++){
			if (participant.uid != this.users[i].uid){
				newparticipants.push(event.participants[i]);
				}
			}
			db.collection("events").doc(event.id).set({
				useremail: event.useremail,
				name: event.name,
				date: event.date,
				description: event.description,
				adress: event.adress,
				category: event.category,
				preciseCategory: event.preciseCategory,
				nbmax: event.nbmax,
				participants: newparticipants
			})
			.then(() => {
			console.log("unsubscribed!");
			event.participants = newparticipants;
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
  	},
  	isIn: function(list, string){
  		let result = false;
  		for (item in list){
  			if (item === string){
  				result = true
  			}
  		}
  		return result;
  	}
  }
};

</script>

<style>
	.name {
		font-size: 200%;

	}
	.button {
		float: right;
	}
</style>