<template>
	<div class="welcome">
		<div>
           <div class="p200"></div>
           <div>
              <img src=".././assets/logo.jpeg">
          </div>
          <div class="p20"></div>
          <v-form class="form">
              <v-text-field large label="Identifiant" class="form2" v-model="email"></v-text-field>
              <v-text-field large label="Mot de passe" class="form2" type="password" v-model="password"></v-text-field>
              <v-btn large color="primary" @click="signIn">Se connecter</v-btn>
          </v-form>
          <v-snackbar :timeout="6000" bottom v-model="snackbar.active">
              {{ snackbar.message }}
              <v-btn flat color="primary" @click.native="snackbar.active = false">Close</v-btn>
          </v-snackbar>
      </div>
  </div>
</template>

<style>
.welcome {
  text-align: center;
  width: 100%;
}
.form {
   width: 60%;
   margin: auto;
}
.form2 {
	color: #FF3D00;
   text-align: center;
}
.p200 {
  height: 100px;
}
.p20 {
   height: 20px;
}
</style>

<script>
import firebase from 'firebase';

export default {
  data: function () {
    return {
      email: "",
      password: "",
      snackbar: {
        active: false,
        message: "Problème d'identification"
    }
}
},
methods: {
    signIn: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(()=>{this.$router.replace("/home")}).catch((error) => {this.snackbar.active = true;});

  }}
};

</script>