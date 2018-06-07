<template>
	<div class="welcome">
		<div>
	      <div class="p200"></div>
	      <img src=".././assets/logo.jpeg" class="logo">
	      <div class="p20"></div>
	      <v-btn large center color="primary" to="/connexion">Se connecter</v-btn><br>
		    <v-btn large center color="primary" to="/register">Créer un compte</v-btn>
	    </div>
	 </div>
</template>
    
<script>
import firebase from 'firebase';

export default {
  data () {
    return {
        user: firebase.auth().currentUser,
        loggedin: false
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
    	this.user = user;
    	if(user){
    		this.loggedin = true;
    		this.$router.replace("/home");
    	}
    	else {this.loggedin = false;}
    });
  },
  methods: {}
};

</script>

<style>
  .welcome {
    text-align: center;
  }
  .p200 {
    height: 100px;
  }
  .p20 {
  	height: 20px;
  }
  .logo {
    max-width: 100%;
  }
</style>
