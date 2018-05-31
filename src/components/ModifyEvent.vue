<template>
	<div>
		<div v-if="loaded" class="container">
			<h1 class="bigtitle">{{event.name}}</h1><br><br>
			<p class="adress">{{event.adress}}</p><p class="date">{{event.date}}</p>
			<img src=".././assets/tronc.jpeg" width="100%">
			<p><b v-if="event.description" class="bold">Description : </b>{{event.description}}</p>
			<p class="center">{{event.participants.length}} / {{event.nbmax}}</p>
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
	if (this.user) {
		db.collection("events").get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				if(doc.id == url[1]){
					this.event = doc.data();
					this.event.id = doc.id;
					console.log(doc.id);
				}
			})
		});
		this.loaded = true;
	}
	
  },
  methods: {
  	deleteEvent: function(event){
  		db.collection("events").doc(event.id).delete().then(function() {
		    console.log("Document successfully deleted!");
		    location.reload();
		}).catch(function(error) {
		    console.error("Error removing document: ", error);
		    this.snackbar.message = "Nous n'avons pas pu supprimer l'évenement"
		    this.snackbar.active = true;
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