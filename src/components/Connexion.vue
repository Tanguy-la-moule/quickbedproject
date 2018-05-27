<template>
	<div class="welcome">
		<div>
	      <div class="p200"></div>
	      <div>
          <img src=".././assets/logo.jpeg">
        </div>
	      <div class="p20"></div>
	      <v-form class="form" v-model="valid">
		    <v-text-field large label="Identifiant" class="form2"></v-text-field>
		    <v-text-field large label="Mot de passe" class="form2" type="password"></v-text-field>
		    <v-btn large class="button" to="/home">Se connecter</v-btn>
		  </v-form>
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
  .button {
    background-color: #FF3D00;
    color: white;
    width: 50%;
  }
  .p200 {
    height: 200px;
  }
  .p20 {
  	height: 20px;
  }
</style>
