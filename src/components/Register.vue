<template>
	<div>
		<div class="top"></div>
		<v-form ref="form" class="container">
			<b class="b">Informations de connection</b>
			<v-text-field large v-model="email" label="Email" :rules="[rules.required, rules.email]" class="input"></v-text-field>
			<v-text-field large v-model="password" label="Mot de passe" :rules="[rules.required, rules.lengthy]" class="input" type="password"></v-text-field>
			<v-text-field large v-model="password2" label="Mot de passe (confirmation)" :rules="[rules.required, rules.same]" class="input" type="password"></v-text-field>
			<div class="top"></div>
			<b class="b">Votre identité</b>
			<v-text-field large v-model="name" label="Nom" class="input"></v-text-field>
			<v-text-field large v-model="firstname" label="Prénom" class="input"></v-text-field>
			<v-text-field large v-model="phonenb" prepend-icon="phone" label="Numéro de téléphone" class="input"></v-text-field>
			<v-text-field large v-model="birthdate" label="Date de naissance (JJ/MM/AAAA)" class="input"></v-text-field>
			<v-select :items="genres" item-value="text" v-model="genre" label="Indiquer votre genre"></v-select>
			<v-select :items="jobs" item-value="text" v-model="job" label="Indiquer votre situation professionnelle" ></v-select>
			<v-select :items="secteurs" item-value="text" v-model="secteur" label="Indiquer votre secteur d\'activité"></v-select>
			<v-select :items="countries" item-value="text" v-model="country" autocomplete label="Indiquer votre nationalité"></v-select>
			<div class="top"></div>
			<b class="b">Intérets</b>
			<v-select :items="sports" item-value="text" v-model="sport" hint="Indiquer vos sports préférés" multiple chips persistent-hint></v-select>
			<v-select :items="courses" item-value="text" v-model="course" hint="Indiquer les matières qui vous intéressent" multiple chips persistent-hint></v-select>
			<v-select :items="hobbies" item-value="text" v-model="hobby" hint="Indiquer vos passions" multiple chips persistent-hint></v-select>
			<div class="top"></div>
			<v-btn large block center color="primary" @click="signUp">Créer un compte</v-btn>
		</v-form>
		<v-snackbar :timeout="6000" bottom v-model="snackbar.active">
			{{ snackbar.message }}
			<v-btn flat color="primary" @click.native="snackbar.active = false">Close</v-btn>
		</v-snackbar>
	</div>
</template>

<script>
import firebase from 'firebase';
import { db } from '../main';

export default {
	data: function () {
		return {
			email: "",
			password: "",
			password2: "",
			name: "",
			firstname: "",
			phonenb: "",
			birthdate: "",
			genre: null,
			job: null,
			secteur: null,
			country: null,
			sport: null,
			course: [],
			hobby: [],
			user: [],
			rules: {
				required: (value) => !!value || 'Requis',
				email: (value) => {
					const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					return pattern.test(value) || 'Email invalide'},
				lengthy: (value) => (value.length >= 8) || 'Le mot de passe doit contenir au moins 8 caractères',
				same: (value) => (this.password === value) || 'Les mots de passe ne sont pas identiques'
			},
			snackbar: {
				active: false,
				message: "Problème d'identification"
			},
			genres: [
				{ text: 'Homme', id: "0" },
				{ text: 'Femme', id: "1" },
				{ text: 'Transgenre', id: "2" },
				{ text: 'Ne se prononce pas', id: "3" }
			],
			jobs: [
				{ text: 'Etudiant ou stagiaire'},
				{ text: 'Emploi salarié'},
				{ text: 'Emploi non salarié'},
				{ text: 'Sans emploi'},
				{ text: 'Retraité'},
				{ text: 'Changement de situation professionnelle'},
				{ text: 'Autre'}
			],
			secteurs: [
				{ text: 'Agriculture'},
				{ text: 'Industrie extractive'},
				{ text: 'Industrie manufacturière'},
				{ text: 'Production et distribution d\'énergie'},
				{ text: 'Construction'},
				{ text: 'Commerce'},
				{ text: 'Transport et entreposage'},
				{ text: 'Hébergement et restauration'},
				{ text: 'Information et communication'},
				{ text: 'Activité financière et assurance'},
				{ text: 'Activité immobilière'},
				{ text: 'Activité scientifique et technique'},
				{ text: 'Service administratif'},
				{ text: 'Enseignement'},
				{ text: 'Santé humaine'},
				{ text: 'Action sociale'},
				{ text: 'Art et spectacle'},
				{ text: 'Autres activités de service'},
				{ text: 'Autres'}
			],
			countries: [{text: "AF - Afghanistan"}, { text: "ZA - Afrique du Sud"}, { text: "AL - Albanie"}, { text: "DZ - Alg\u00e9rie"}, { text: "DE - Allemagne"}, { text: "AD - Andorre"}, { text: "AO - Angola"}, { text: "AI - Anguilla"}, { text: "AQ - Antarctique"}, { text: "AG - Antigua-et-Barbuda"}, { text: "SA - Arabie saoudite"}, { text: "AR - Argentine"}, { text: "AM - Arm\u00e9nie"}, { text: "AW - Aruba"}, { text: "AU - Australie"}, { text: "AT - Autriche"}, { text: "AZ - Azerba\u00efdjan"}, { text: "BS - Bahamas"}, { text: "BH - Bahre\u00efn"}, { text: "BD - Bangladesh"}, { text: "BB - Barbade"}, { text: "BE - Belgique"}, { text: "BZ - Belize"}, { text: "BJ - B\u00e9nin"}, { text: "BM - Bermudes"}, { text: "BT - Bhoutan"}, { text: "BY - Bi\u00e9lorussie"}, { text: "BO - Bolivie"}, { text: "BA - Bosnie-Herz\u00e9govine"}, { text: "BW - Botswana"}, { text: "BR - Br\u00e9sil"}, { text: "BN - Brun\u00e9i Darussalam"}, { text: "BG - Bulgarie"}, { text: "BF - Burkina Faso"}, { text: "BI - Burundi"}, { text: "KH - Cambodge"}, { text: "CM - Cameroun"}, { text: "CA - Canada"}, { text: "CV - Cap-Vert"}, { text: "EA - Ceuta et Melilla"}, { text: "CL - Chili"}, { text: "CN - Chine"}, { text: "CY - Chypre"}, { text: "CO - Colombie"}, { text: "KM - Comores"}, { text: "CG - Congo-Brazzaville"}, { text: "CD - Congo-Kinshasa"}, { text: "KP - Cor\u00e9e du Nord"}, { text: "KR - Cor\u00e9e du Sud"}, { text: "CR - Costa Rica"}, { text: "CI - C\u00f4te d\u2019Ivoire"}, { text: "HR - Croatie"}, { text: "CU - Cuba"}, { text: "CW - Cura\u00e7ao"}, { text: "DK - Danemark"}, { text: "DG - Diego Garcia"}, { text: "DJ - Djibouti"}, { text: "DM - Dominique"}, { text: "EG - \u00c9gypte"}, { text: "SV - El Salvador"}, { text: "AE - \u00c9mirats arabes unis"}, { text: "EC - \u00c9quateur"}, { text: "ER - \u00c9rythr\u00e9e"}, { text: "ES - Espagne"}, { text: "EE - Estonie"}, { text: "VA - \u00c9tat de la Cit\u00e9 du Vatican"}, { text: "FM - \u00c9tats f\u00e9d\u00e9r\u00e9s de Micron\u00e9sie"}, { text: "US - \u00c9tats-Unis"}, { text: "ET - \u00c9thiopie"}, { text: "EZ - Eurozone"}, { text: "FJ - Fidji"}, { text: "FI - Finlande"}, { text: "FR - France"}, { text: "GA - Gabon"}, { text: "GM - Gambie"}, { text: "GE - G\u00e9orgie"}, { text: "GS - G\u00e9orgie du Sud et \u00eeles Sandwich du Sud"}, { text: "GH - Ghana"}, { text: "GI - Gibraltar"}, { text: "GR - Gr\u00e8ce"}, { text: "GD - Grenade"}, { text: "GL - Groenland"}, { text: "GP - Guadeloupe"}, { text: "GU - Guam"}, { text: "GT - Guatemala"}, { text: "GG - Guernesey"}, { text: "GN - Guin\u00e9e"}, { text: "GQ - Guin\u00e9e \u00e9quatoriale"}, { text: "GW - Guin\u00e9e-Bissau"}, { text: "GY - Guyana"}, { text: "GF - Guyane fran\u00e7aise"}, { text: "HT - Ha\u00efti"}, { text: "HN - Honduras"}, { text: "HU - Hongrie"}, { text: "CX - \u00cele Christmas"}, { text: "AC - \u00cele de l\u2019Ascension"}, { text: "IM - \u00cele de Man"}, { text: "NF - \u00cele Norfolk"}, { text: "AX - \u00celes \u00c5land"}, { text: "KY - \u00celes Ca\u00efmans"}, { text: "IC - \u00celes Canaries"}, { text: "CC - \u00celes Cocos"}, { text: "CK - \u00celes Cook"}, { text: "FO - \u00celes F\u00e9ro\u00e9"}, { text: "FK - \u00celes Malouines"}, { text: "MP - \u00celes Mariannes du Nord"}, { text: "MH - \u00celes Marshall"}, { text: "UM - \u00celes mineures \u00e9loign\u00e9es des \u00c9tats-Unis"}, { text: "PN - \u00celes Pitcairn"}, { text: "SB - \u00celes Salomon"}, { text: "TC - \u00celes Turques-et-Ca\u00efques"}, { text: "VG - \u00celes Vierges britanniques"}, { text: "VI - \u00celes Vierges des \u00c9tats-Unis"}, { text: "IN - Inde"}, { text: "ID - Indon\u00e9sie"}, { text: "IQ - Irak"}, { text: "IR - Iran"}, { text: "IE - Irlande"}, { text: "IS - Islande"}, { text: "IL - Isra\u00ebl"}, { text: "IT - Italie"}, { text: "JM - Jama\u00efque"}, { text: "JP - Japon"}, { text: "JE - Jersey"}, { text: "JO - Jordanie"}, { text: "KZ - Kazakhstan"}, { text: "KE - Kenya"}, { text: "KG - Kirghizistan"}, { text: "KI - Kiribati"}, { text: "XK - Kosovo"}, { text: "KW - Kowe\u00eft"}, { text: "RE - La R\u00e9union"}, { text: "LA - Laos"}, { text: "LS - Lesotho"}, { text: "LV - Lettonie"}, { text: "LB - Liban"}, { text: "LR - Lib\u00e9ria"}, { text: "LY - Libye"}, { text: "LI - Liechtenstein"}, { text: "LT - Lituanie"}, { text: "LU - Luxembourg"}, { text: "MK - Mac\u00e9doine"}, { text: "MG - Madagascar"}, { text: "MY - Malaisie"}, { text: "MW - Malawi"}, { text: "MV - Maldives"}, { text: "ML - Mali"}, { text: "MT - Malte"}, { text: "MA - Maroc"}, { text: "MQ - Martinique"}, { text: "MU - Maurice"}, { text: "MR - Mauritanie"}, { text: "YT - Mayotte"}, { text: "MX - Mexique"}, { text: "MD - Moldavie"}, { text: "MC - Monaco"}, { text: "MN - Mongolie"}, { text: "ME - Mont\u00e9n\u00e9gro"}, { text: "MS - Montserrat"}, { text: "MZ - Mozambique"}, { text: "MM - Myanmar (Birmanie)"}, { text: "NA - Namibie"}, { text: "UN - Nations Unies"}, { text: "NR - Nauru"}, { text: "NP - N\u00e9pal"}, { text: "NI - Nicaragua"}, { text: "NE - Niger"}, { text: "NG - Nig\u00e9ria"}, { text: "NU - Niue"}, { text: "NO - Norv\u00e8ge"}, { text: "NC - Nouvelle-Cal\u00e9donie"}, { text: "NZ - Nouvelle-Z\u00e9lande"}, { text: "OM - Oman"}, { text: "UG - Ouganda"}, { text: "UZ - Ouzb\u00e9kistan"}, { text: "PK - Pakistan"}, { text: "PW - Palaos"}, { text: "PA - Panama"}, { text: "PG - Papouasie-Nouvelle-Guin\u00e9e"}, { text: "PY - Paraguay"}, { text: "NL - Pays-Bas"}, { text: "BQ - Pays-Bas carib\u00e9ens"}, { text: "PE - P\u00e9rou"}, { text: "PH - Philippines"}, { text: "PL - Pologne"}, { text: "PF - Polyn\u00e9sie fran\u00e7aise"}, { text: "PR - Porto Rico"}, { text: "PT - Portugal"}, { text: "QA - Qatar"}, { text: "HK - R.A.S. chinoise de Hong Kong"}, { text: "MO - R.A.S. chinoise de Macao"}, { text: "CF - R\u00e9publique centrafricaine"}, { text: "DO - R\u00e9publique dominicaine"}, { text: "RO - Roumanie"}, { text: "GB - Royaume-Uni"}, { text: "RU - Russie"}, { text: "RW - Rwanda"}, { text: "EH - Sahara occidental"}, { text: "BL - Saint-Barth\u00e9lemy"}, { text: "KN - Saint-Christophe-et-Ni\u00e9v\u00e8s"}, { text: "SM - Saint-Marin"}, { text: "MF - Saint-Martin"}, { text: "SX - Saint-Martin (partie n\u00e9erlandaise)"}, { text: "PM - Saint-Pierre-et-Miquelon"}, { text: "VC - Saint-Vincent-et-les-Grenadines"}, { text: "SH - Sainte-H\u00e9l\u00e8ne"}, { text: "LC - Sainte-Lucie"}, { text: "WS - Samoa"}, { text: "AS - Samoa am\u00e9ricaines"}, { text: "ST - Sao Tom\u00e9-et-Principe"}, { text: "SN - S\u00e9n\u00e9gal"}, { text: "RS - Serbie"}, { text: "SC - Seychelles"}, { text: "SL - Sierra Leone"}, { text: "SG - Singapour"}, { text: "SK - Slovaquie"}, { text: "SI - Slov\u00e9nie"}, { text: "SO - Somalie"}, { text: "SD - Soudan"}, { text: "SS - Soudan du Sud"}, { text: "LK - Sri Lanka"}, { text: "SE - Su\u00e8de"}, { text: "CH - Suisse"}, { text: "SR - Suriname"}, { text: "SJ - Svalbard et Jan Mayen"}, { text: "SZ - Swaziland"}, { text: "SY - Syrie"}, { text: "TJ - Tadjikistan"}, { text: "TW - Ta\u00efwan"}, { text: "TZ - Tanzanie"}, { text: "TD - Tchad"}, { text: "CZ - Tch\u00e9quie"}, { text: "TF - Terres australes fran\u00e7aises"}, { text: "IO - Territoire britannique de l\u2019oc\u00e9an Indien"}, { text: "PS - Territoires palestiniens"}, { text: "TH - Tha\u00eflande"}, { text: "TL - Timor oriental"}, { text: "TG - Togo"}, { text: "TK - Tok\u00e9laou"}, { text: "TO - Tonga"}, { text: "TT - Trinit\u00e9-et-Tobago"}, { text: "TA - Tristan da Cunha"}, { text: "TN - Tunisie"}, { text: "TM - Turkm\u00e9nistan"}, { text: "TR - Turquie"}, { text: "TV - Tuvalu"}, { text: "UA - Ukraine"}, { text: "UY - Uruguay"}, { text: "VU - Vanuatu"}, { text: "VE - Venezuela"}, { text: "VN - Vietnam"}, { text: "WF - Wallis-et-Futuna"}, { text: "YE - Y\u00e9men"}, { text: "ZM - Zambie"}, { text: "ZW - Zimbabwe"}
			],
			sports: [
				{ text: 'Natation'},
				{ text: 'Boxe'},
				{ text: 'Volley'},
				{ text: 'Dance'},
				{ text: 'Foot'},
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
		signUp: function() {
			if (this.$refs.form.validate()){
				firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
				.then(()=>{
					this.user = firebase.auth().currentUser;
					db.collection("users").doc(this.user.uid).set({
					    email: this.email,
					    name: this.name,
					    admin: false,
					    firstname: this.firstname,
					    phonenb: this.phonenb,
					    birthdate: this.birthdate,
					    genre: this.genre,
					    job: this.job,
					    secteur: this.secteur,
					    country: this.country,
					    sport: this.sport,
					    course: this.course,
					    hobby: this.hobby
					})
					.then(() => {
					    console.log("Document successfully written!");
    					this.$router.replace("/home");
					})
					.catch((error) => {
					    console.error("Error writing document: ", error);
					    this.snackbar.active = true;
					});
				})
				.catch((error) => {
					this.snackbar.active = true;
					console.log(error);
				});
			}
			else {this.snackbar.active = true}
		}
	}
};

</script>

<style>
.top {
	height: 40px;
}
.form {
	color: #FF3D00;
}
.input {
	color: #FF3D00;
}
.b {
	color: #FF3D00;
	font-size: 200%;
	margin-left: 40px;
}
.select {
	color: #FF3D00;
}
</style>

