<template>
    <div class="main">
      <div class="container">
        <p align="center"><router-link to="/eventcontainer"><img src=".././assets/sports.jpeg" class="image"></router-link></p>
        <p align="center"><router-link to="/eventcontainer"><img src=".././assets/loisirs.jpeg" class="image"></router-link></p>
        <p align="center"><router-link to="/eventcontainer"><img src=".././assets/cours.jpeg" class="image"></router-link></p>
      </div>
    </div>
</template>

<style>
  .image {
    max-width: 35%;
    height: auto;
    text-align: center;
  }
  .main {
    width: 100%;
  }
  .container {
    width: 50%;
  }
</style>
