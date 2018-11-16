import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import CreateGame from '@/components/Game/CreateGame.vue'
import Games from '@/components/Game/Games.vue'
import Game from '@/components/Game/Game.vue'
import Profile from '@/components/User/Profile.vue'
import Signin from '@/components/User/Signin.vue'
import Signup from '@/components/User/Signup.vue'
import AuthGuard from './authGuard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/games',
      name: 'Games',
      component: Games
    },
    {
      path: '/game/new',
      name: 'CreateGame',
      component: CreateGame,
      beforeEnter: AuthGuard
    },
    {
      path: '/games/:gameId',
      name: 'Game',
      props: true,
      component: Game
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
})
