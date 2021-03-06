import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/components/Welcome';
import Connexion from '@/components/Connexion';
import Register from '@/components/Register';
import Home from '@/components/Home';
import EventContainer from '@/components/EventContainer';
import AddEvent from '@/components/AddEvent';
import AdminEventContainer from '@/components/AdminEventContainer';
import AdminParticipantManager from '@/components/AdminParticipantManager';
import ModifyEvent from '@/components/ModifyEvent';

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
    },
    {
      path: '/addevent',
      name: 'AddEvent',
      component: AddEvent
    },
    {
      path: '/admineventcontainer',
      name: 'AdminEventContainer',
      component: AdminEventContainer
    },
    {
      path: '/adminparticipantmanager',
      name: 'AdminParticipantManager',
      component: AdminParticipantManager
    },
    {
      path: 'modifyevent',
      name: 'ModifyEvent',
      component: ModifyEvent
    }
  ]
})
