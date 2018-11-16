import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import firebase from 'firebase'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Alert from './components/Shared/Alert.vue'
import EditGame from './components/Game/EditGame.vue'

Vue.config.productionTip = false

Vue.component('app-alert', Alert)
Vue.component('app-edit-game', EditGame)

firebase.initializeApp({
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: "ffinder-2894b.firebaseapp.com",
  databaseURL: "https://ffinder-2894b.firebaseio.com",
  projectId: "ffinder-2894b",
  storageBucket: "ffinder-2894b.appspot.com"
})

const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  new Vue({
    router,
    store,
    render: h => h(App),
    created () {
      this.$store.dispatch('loadGames')
      if (user) {
        this.$store.dispatch('userAutoSignIn', user)
        this.$store.dispatch('userFetchData')
      }
    }
  }).$mount('#app')
  unsubscribe()
})
