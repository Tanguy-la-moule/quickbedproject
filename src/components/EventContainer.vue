<template>
	<div class="main">
		<div class="container">
			<v-btn @click="getEvents">Afficher les évènements</v-btn>
			<div v-if="display" v-for="event in events">
				<div class="space"></div>
				<div><font class="bigtitle" size="+4">{{event[1]}}</font><font class="date" size="+4">{{event[2]}}</font></div><br>
				<img src=".././assets/tronc.jpeg" class="sportimage"><br><br>
				<font class="description" size="+2"><b class="bold">Description : </b>{{event[4]}}</font><br><br>
				<font size="+2"><b class="bold">Adresse : </b>{{event[3]}}</font><br><br>
				<v-btn block large class="button" v-if="subscription[event[0]]">S'inscrire</v-btn>
				<v-btn block large class="button2" v-if="!subscription[event[0]]">Se désinscrire</v-btn>
				<div class="space"></div>
				<hr width="75%" color="#FF3D00"><br><br>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data: function () {
    return {
    	events: [],
    	display: false,
    	subscription: [false, true, false],
    	link: ".././assets/beachvolley.jpg",
        event0: [
          '0',
          'Basket',
          '01/06/2018',
          '22 Rue Duperré, 75009 Paris',
          'Tournoi de basket avec les résidents de l\'établissement, rencontre avec l\'équipe de Paris 13',
          ".././assets/basket.jpg",
          'Centre Humanitaire Paris-Nord',
          true
        ],
        event1: [
          '1',
          'Beach volley',
          '05/06/2018',
          'Centre Sportif Louis Lumière, 30 Rue Louis Lumière, 75020 Paris',
          'Matchs de beach volley ouvert à tous',
          ".././assets/beachvolley.jpg",
          'Centre Humanitaire Paris-Sud',
          false
        ],
        event2: [
          '2',
          'Football',
          '08/06/2018',
          '22 Rue Duperré, 75009 Paris',
          'Matchs de football',
          ".././assets/football.jpg",
          'Centre Humanitaire Paris-Nord',
          true
        ]
    }
  },
  methods: {
  	getEvents: function() {
  		this.display = !this.display || this.display;
      	this.events = [this.event0, this.event1, this.event2];
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
	}
	.sportimage {
		width: 100%;
	}
	.bold {
		color: #FF3D00;
	}
	.button {
		background-color: #FF3D00;
		color: white;
		font-size: 150%;
	}
	.button2 {
		background-color: white;
		color: #FF3D00;
		font-size: 150%;
	}
</style>