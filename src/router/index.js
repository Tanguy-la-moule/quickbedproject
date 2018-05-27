import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Connexion from '@/components/Connexion'
import Register from '@/components/Register'
import Home from '@/components/Home'
import EventContainer from '@/components/EventContainer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
   	  path:'/connexion',
   	  name: 'Connexion',
   	  component: Connexion
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/eventcontainer',
      name: 'EventContainer',
      component: EventContainer
    }
  ]
})
