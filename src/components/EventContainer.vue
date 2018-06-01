<template>
	<div>
		<div v-for="event in events" class="container">
			<h1 class="bigtitle">{{event.name}}</h1><br><br>
			<p class="adress">{{event.adress}}</p><p class="date">{{event.date}}</p>
			<img src=".././assets/tronc.jpeg" width="100%">
			<p><b v-if="event.description" class="bold">Description : </b>{{event.description}}</p>
			<p class="center">{{event.participants.length}} / {{event.nbmax}}</p>
			<v-btn block v-if="!event.subscribed" :disabled="event.disabled" large color="primary" @click="subscribe(event)">S'inscrire</v-btn>
			<v-btn block v-if="event.subscribed" :disabled="event.disabled" large @click="unsubscribe(event)">Se désinscrire</v-btn><br><br>
			<v-snackbar :timeout="6000" bottom v-model="snackbar.active">
				{{ snackbar.message }}
			<v-btn flat color="primary" @click.native="snackbar.active = false">Close</v-btn>
		</v-snackbar>
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
    	events: [],
    	display: false,
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
	if (this.user) {
		db.collection("events").get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				let event = doc.data();
				event.id = doc.id;
				event.disabled = false;
				event.subscribed = event.participants.indexOf(this.user.uid) >= 0;
				if(event.useremail == this.user.email || event.participants.length >= event.nbmax){
					event.disabled = true;
				}
				this.events.push(event);
			})
		});
	}
	
  },
  methods: {
  	subscribe: function(event){
  		this.user = currentUser.profile;
  		if (this.user) {
  			if(event.participants.length < event.nbmax){
  				let newparticipants = event.participants;
  				newparticipants.push(this.user.uid);
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
  				});
  				if(event.useremail == this.user.email || event.participants.length >= event.nbmax){
					event.disabled = true;
				}
  				event.subscribed = true;
  			} else {
  				console.log('the event is full')
  			}
  		} else {
  			console.log('no user or no user data');
  		}
  	},
  	unsubscribe: function(event){
  		this.user = currentUser.profile;
  		if (this.user) {
  			if(event.useremail != this.user.email){
  				let newparticipants = [];
  				console.log(event.participants)
  				console.log(this.user.uid)
  				for (var i = 0; i < event.participants.length; i++){
  					if (event.participants[i] != this.user.uid){
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
					console.log("unsubscribed");
				})
				.catch((error) => {
					console.error("Error writing document: ", error);
				});
  				event.subscribed = false;
  			} else {
  				console.log('the user created the event')
  			}
  		} else {
  			console.log('no user or no user data');
  		}
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
	.main {
		width: 100%;
	}
	.container {
		width: 50%;
	}
	.space {
		height: 50px;
	}
	.bigtitle {
		float: left;
		color: #FF3D00;
	}
	.date {
		float: right;
		color: #FF3D00;
		font-size: 120%;
	}
	.adress {
		float: left;
	}
	.bold {
		color: #FF3D00;
		font-size: 130%;
	}
	.center {
		text-align: center;
		color: #FF3D00;
		font-size: 150%
	}
</style>