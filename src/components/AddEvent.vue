<template>
	<div>
		<v-form ref="form" class="container">
			<br>
			<v-text-field v-model="name" :counter="50" :rules="[rules.nameRules, rules.required]" label="Nom de l'article"></v-text-field>

			<v-menu
			ref="menu"
			:close-on-content-click="false"
			v-model="menu"
			:nudge-right="40"
			:return-value.sync="date"
			lazy
			transition="scale-transition"
			offset-y
			full-width
			min-width="290px"
			>
			<v-text-field
			slot="activator"
			v-model="date"
			label="Date de l'évenement"
			prepend-icon="event"
			readonly
			></v-text-field>
			<v-date-picker v-model="date" no-title scrollable>
				<v-spacer></v-spacer>
				<v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
				<v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
			</v-date-picker>
		</v-menu>

		<v-text-field v-model="adress" :rules="[rules.required]" label="Adresse de l'évenement"></v-text-field>
		<v-text-field v-model="description" multi-line :counter="400" :rules="[rules.descriptionRules]" label="Description de l'article"></v-text-field>
		<v-text-field type="number" v-model.number="nbmax" label="Nombre maximum de personnes à l'évenement" :rules="[rules.numberRules]"></v-text-field>

		<v-select :items="categories" item-value="text" :rules="[rules.required]" v-model="category" hint="Indiquer la catégorie de l'évenement" persistent-hint></v-select>
		<v-select v-if="category == 'Sport'" :items="sports" item-value="text" v-model="preciseCategory" hint="Indiquer le sport concerné" persistent-hint></v-select>
		<v-select v-if="category == 'Cours'" :items="courses" item-value="text" v-model="preciseCategory" hint="Indiquer la matière concernée" persistent-hint></v-select>
		<v-select v-if="category == 'Loisir'" :items="hobbies" item-value="text" v-model="preciseCategory" hint="Indiquer le loisir concerné" persistent-hint></v-select><br>
		<v-btn large block center color="primary" @click="addEvent">Ajouter un évenement</v-btn>

		<v-snackbar :timeout="6000" bottom v-model="snackbar.active">
			{{ snackbar.message }}
			<v-btn flat color="primary" @click.native="snackbar.active = false">Close</v-btn>
		</v-snackbar>
	</v-form>
</div>
</template>

<script>
import firebase from 'firebase';
import { db } from '../main';

export default {
	data: function () {
		return {
			name: "",
			date: null,
			menu: false,
			description: "",
			adress: "",
			category: "",
			preciseCategory: "",
			nbmax: 10,
			participants: [],
			rules: {
				required: (value) => !!value || 'Ce champ est obligatoire pour la création de l\'événement',
				nameRules: (v) => v.length <= 50 || 'Le nom est trop long',
				descriptionRules: (v) => v.length <= 400 || 'La description est trop longue',
				numberRules: (v) => v >= 10 || 'Le nombre de résidents minimum invitable est 10'
			},
			snackbar: {
				active: false,
				message: "Il manque des informations pour créer l'évenement"
			},
			categories: [
			{ text : 'Sport' },
			{ text : 'Cours'},
			{ text : 'Loisir'}
			],
			sports: [
			{ text: 'Natation'},
			{ text: 'Boxe'},
			{ text: 'Volley'},
			{ text: 'Dance'},
			{ text: 'Football'},
			{ text: 'Gym'},
			{ text: 'Tennis'},
			{ text: 'Course'},
			{ text: 'Yoga'}
			],
			courses: [
			{ text: 'Langues'},
			{ text: 'Histoire'},
			{ text: 'Littérature'},
			{ text: 'Mathématiques'},
			{ text: 'Biologie'},
			{ text: 'Physique'},
			{ text: 'Economie'},
			{ text: 'Droit'},
			{ text: 'Sciences sociales'}
			],
			hobbies: [
			{ text: 'Musique'},
			{ text: 'Jeux vidéos'},
			{ text: 'Peinture'},
			{ text: 'Photographie'},
			{ text: 'Religion'},
			{ text: 'Evenements culturel'},
			{ text: 'Théatre'},
			{ text: 'Gastronomie'},
			{ text: 'Bricolage'}
			]
		}
	},
	methods: {
		addEvent: function() {
			if (this.$refs.form.validate()){
				if (this.date){
					if (this.preciseCategory){
						this.user = firebase.auth().currentUser;
						this.participants.push(this.user.uid);
						db.collection("events").add({
							useremail: this.user.email,
							name: this.name,
							date: this.dateFilter(this.date),
							description: this.description,
							adress: this.adress,
							category: this.category,
							preciseCategory: this.preciseCategory,
							nbmax: this.nbmax + 1,
							participants: this.participants
						})
						.then(() => {
							console.log("Event successfully added!");
							this.$router.replace("/home");
						})
						.catch((error) => {
							console.error("Error writing document: ", error);
							this.snackbar.message = "erreur d\'écriture de la database";
							this.snackbar.active = true;
						});
					}
					else {
						this.snackbar.message = "category problem";
						this.snackbar.active = true;
					}
				}
				else {
					this.snackbar.message = "date problem";
					this.snackbar.active = true;
				}
			}
			else {
				this.snackbar.message = "form problem";
				this.snackbar.active = true;
			}
		},
		dateFilter: function(string_date){
	  		if(string_date.length == 10){
	  			string_date = string_date.split('-');
	  			return string_date[2]+'-'+string_date[1]+'-'+string_date[0];
	  		} else {
	  			return 'problem with date format';
	  		}
  		}
	}
};

</script>

<style>

</style>

