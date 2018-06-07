<template>
	<v-app>
		<v-content v-if="!loading">
			<v-toolbar>
       <v-toolbar-title v-if="userdata">Bonjour {{userdata.firstname}}</v-toolbar-title>
       <v-spacer></v-spacer>
       <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-if="admin" to='/addevent'>Ajouter un évenement</v-btn>
        <v-btn flat v-if="admin" to='/admineventcontainer'>Gérer ses évenements</v-btn>
        <v-btn flat v-if="loggedin" @click="logOut">Se déconnecter</v-btn>
        <v-btn flat v-if="!loggedin" to="/connexion">Se connecter</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view/>
  </v-content>
</v-app>
</template>

<script>
import firebase from 'firebase';
import { db, currentUser } from './main';

export default {
  data () {
    return {
      user: currentUser.profile,
      loggedin: currentUser.logged,
      userdata: currentUser.data,
      loading: true,
      admin: false
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
    	if(user){
    		currentUser.logged = true;
        this.loggedin = true;
    		db.collection("users").doc(user.uid).get().then((doc) => {
          currentUser.profile = user;
          this.user = user;
    			currentUser.data = doc.data();
          this.userdata = doc.data();
          this.admin = this.userdata.admin;
          this.loading = false;
    		});
    	}
    	else {
        currentUser.logged = false;
        this.loggedin = false;
        currentUser.profile = null;
        this.user = null;
        currentUser.data = null;
        this.userdata = null;
        this.admin = false;
        this.loading = false;
      }
    });
  },
  methods: {
  	logOut: function(){
  		firebase.auth().signOut().then(() => {
        console.log('Signed Out');
        this.$router.replace('/')
      }, function(error) {
        console.error('Sign Out Error', error);
      });
  	}
  }
};

</script>
