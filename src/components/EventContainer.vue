<template>
	<div>
		<div v-for="event in events" class="container">
			<h1 class="bigtitle">{{event.name}}</h1><br><br>
			<p class="adress">{{event.adress}}</p><p class="date">{{event.date}}</p>
			<img src=".././assets/tronc.jpeg" width="100%">
			<p><b v-if="event.description" class="bold">Description : </b>{{event.description}}</p>
			<v-btn block v-if="!event.subscribed" large color="primary">S'inscrire</v-btn>
			<v-btn block v-if="event.subscribed" large>Se désinscrire</v-btn><br><br>

			<v-snackbar :timeout="6000" bottom v-model="snackbar.active">
				{{ snackbar.message }}
			<v-btn flat color="primary" @click.native="snackbar.active = false">Close</v-btn>
		</v-snackbar>
		</div>
	</div>
</template>

<script>
import firebase from 'firebase';
import { db } from '../main';

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
    }
  },
  created () {
  	this.user = firebase.auth().currentUser;
	if (this.user) {
		db.collection("events").get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				let event = doc.data();
				event.subscribed = event.participants.indexOf(this.user.uid) >= 0;
				console.log(event.subscribed)
				this.events.push(event);
			})
		});
	}// else {
//		console.log("pas d\'user")
//	}
	
	
  },
  methods: {
  	subscribe: function(event){
  		this.user = firebase.auth().currentUser;
  		if (this.user) {

  		} else {
  			console.log('no user');
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
</style>