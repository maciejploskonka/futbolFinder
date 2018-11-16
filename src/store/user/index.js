import * as firebase from 'firebase'
import router from '@/router'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    userRegisterForGame (state, payload) {
      state.user.gamesRegistered.push(payload)
    },
    userUnregisterFromGame (state, payload) {
      const gameIndex = state.user.gamesRegistered.findIndex(game => game.id === payload)
      state.user.gamesRegistered.splice(gameIndex, 1)
    }
  },
  actions: {
    userSignUp ({ commit }, payload) {
      commit('setLoading', true)
      commit('setError', null)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          commit('setLoading', false)
          const newUser = {
            id: data.user.uid,
            gamesCreated: [],
            gamesRegistered: []
          }
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    userSignIn ({ commit, dispatch }, payload) {
      commit('setLoading', true)
      commit('setError', null)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          // sciagnac dane o grach
          commit('setLoading', false)
          const newUser = {
            id: data.user.uid,
            gamesCreated: [],
            gamesRegistered: []
          }
          commit('setUser', newUser)
          dispatch('userFetchData')
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    userAutoSignIn ({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        gamesCreated: [],
        gamesRegistered: []
      })
    },
    userFetchData ({ commit, getters }) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id + '/gamesRegistered').once('value')
        .then(data => {
          const obj = data.val()
          let gamesCreated = []
          let gamesRegistered = []
          for (let key in obj) {
            gamesRegistered.push(obj[key])
          }
          const userWithFetchedData = {
            id: user.id,
            gamesCreated: gamesCreated,
            gamesRegistered: gamesRegistered
          }
          commit('setUser', userWithFetchedData)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    userLogout ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
      router.push('/')
    },
    userRegisterForGame ({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id + '/gamesRegistered').push(payload)
        .then(() => {
          commit('userRegisterForGame', payload)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    userUnregisterFromGame ({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.user
      const fb = firebase.database().ref('/users/' + user.id + '/gamesRegistered')
      fb.once('value')
        .then(data => {
          const obj = data.val()
          for (let key in obj) {
            if (obj[key] === payload) {
              fb.child(key).remove()
            }
          }
          commit('userUnregisterFromGame', payload)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
