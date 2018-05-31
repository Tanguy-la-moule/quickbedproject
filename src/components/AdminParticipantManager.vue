<template>
	<div>
		<div v-for="participant in users" class="container">
			<p>{{participant}}</p>
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