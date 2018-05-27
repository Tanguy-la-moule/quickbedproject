<template>
	<div class="welcome">
		<div>
	      <div class="p200"></div>
	      <img src=".././assets/logo.jpeg">
	      <div class="p20"></div>
	      <v-btn large center class="button" to="/connexion">Se connecter</v-btn>
		  <v-btn large center class="button" to="/register">Créer un compte</v-btn>
	    </div>
	 </div>
</template>
    


<style>
  .welcome {
    text-align: center;
    width: 100%;
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
