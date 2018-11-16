import Vue from 'vue'
import Vuex from 'vuex'
// import * as firebase from 'firebase'
// import router from '../router'

import games from './games'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    games: games,
    user: user,
    shared: shared
  }
})

// import Vue from 'vue'
// import Vuex from 'vuex'
// import * as firebase from 'firebase'
// import router from '../router'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     loadedGames: [],
//     user: null,
//     loading: false,
//     error: null
//   },
//   mutations: {
//     setLoadedGames(state, payload) {
//       state.loadedGames = payload
//     },
//     createGame(state, payload) {
//       state.loadedGames.push(payload)
//     },
//     updateGame(state, payload) {
//       const game = state.loadedGames.find(game => {
//         return game.id === payload.id
//       })
//       if (payload.title) {
//         game.title = payload.title
//       }
//       if (payload.place) {
//         game.place = payload.place
//       }
//       if (payload.level) {
//         game.level = payload.level
//       }
//       if (payload.date) {
//         game.date = payload.game
//       }
//       if (payload.time) {
//         game.time = payload.time
//       }
//     },
//     setUser(state, payload) {
//       state.user = payload
//     },
//     userRegisterForGame(state, payload) {
//       state.user.gamesRegistered.push(payload)
//     },
//     userUnregisterFromGame(state, payload) {
//       const gameIndex = state.user.gamesRegistered.findIndex(game => game.id === payload)
//       state.user.gamesRegistered.splice(gameIndex, 1)
//     },
//     setLoading(state, payload) {
//       state.loading = payload
//     },
//     setError(state, payload) {
//       state.error = payload
//     }
//   },
//   actions: {
//     loadGames({ commit }) {
//       commit('setLoading', true)
//       firebase.database().ref('games').once('value')
//         .then(
//           data => {
//             const games = []
//             const obj = data.val()
//             for (let key in obj) {
//               games.push({
//                 id: key,
//                 title: obj[key].title,
//                 place: obj[key].place,
//                 level: obj[key].level,
//                 date: obj[key].date,
//                 time: obj[key].time,
//                 creatorId: obj[key].creatorId
//               })
//             }
//             commit('setLoadedGames', games)
//             commit('setLoading', false)
//           }
//         )
//         .catch(
//           error => {
//             commit('setLoading', false)
//             console.log(error)
//           }
//         )
//     },
//     createGame({ commit, getters }, payload) {
//       const game = {
//         title: payload.title,
//         place: payload.place,
//         level: payload.level,
//         date: payload.date,
//         time: payload.time,
//         creatorId: getters.user.id
//       }
//       firebase.database().ref('games').push(game)
//         .then(
//           data => {
//             console.log(data)
//             const key = data.key
//             commit('createGame', { ...game, id: key })
//           })
//         .catch(
//           error => {
//             console.log(error)
//           })
//     },
//     updateGame({ commit }, payload) {
//       commit('setLoading', true)
//       const updateGame = {}
//       if (payload.title) {
//         updateGame.title = payload.title
//       }
//       if (payload.place) {
//         updateGame.place = payload.place
//       }
//       if (payload.level) {
//         updateGame.level = payload.level
//       }
//       if (payload.date) {
//         updateGame.date = payload.date
//       }
//       if (payload.time) {
//         updateGame.time = payload.time
//       }
//       firebase.database().ref('games').child(payload.id).update(updateGame)
//         .then(() => {
//           commit('setLoading', false)
//           commit('updateGame', payload)
//         })
//         .catch(
//           error => {
//             console.log(error)
//             commit('setLoading', false)
//           }
//         )
//     },
//     userSignUp({ commit }, payload) {
//       commit('setLoading', true)
//       commit('setError', null)
//       firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
//         .then(
//           data => {
//             commit('setLoading', false)
//             const newUser = {
//               id: data.user.uid,
//               gamesCreated: [],
//               gamesRegistered: []
//             }
//             commit('setUser', newUser)
//           }
//         )
//         .catch(
//           error => {
//             commit('setLoading', false)
//             commit('setError', error)
//             console.log(error)
//           }
//         )
//     },
//     userSignIn({ commit }, payload) {
//       commit('setLoading', true)
//       commit('setError', null)
//       firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
//         .then(
//           data => {
//             // sciagnac dane o grach
//             commit('setLoading', false)
//             const newUser = {
//               id: data.user.uid,
//               gamesCreated: [],
//               gamesRegistered: []
//             }
//             commit('setUser', newUser)
//           }
//         )
//         .catch(
//           error => {
//             commit('setLoading', false)
//             commit('setError', error)
//             console.log(error)
//           }
//           )
//         },
//         userAutoSignIn({ commit }, payload) {
//           commit('setUser', {
//             id: payload.uid,
//             gamesCreated: [],
//             gamesRegistered: []
//           })
//         },
//         userFetchData({ commit, getters }) {
//           commit('setLoading', true)
//           const user = getters.user
//           firebase.database().ref('/users/' + user.id + '/gamesRegistered').once('value')
//           .then(data => {
//             const obj = data.val()
//             let gamesCreated = []
//             let gamesRegistered = []
//             for (let key in obj) {
//               gamesRegistered.push(obj[key])
//             }
//             const userWithFetchedData = {
//               id: user.id,
//               gamesCreated: gamesCreated,
//               gamesRegistered: gamesRegistered
//             }
//             commit('setUser', userWithFetchedData)
//             commit('setLoading', false)
//           })
//           .catch(error => {
//             console.log(error)
//             commit('setLoading', false)
//           })
//     },
//     userLogout({ commit }) {
//       firebase.auth().signOut()
//       commit('setUser', null)
//       router.push('/')
//     },
//     userRegisterForGame({ commit, getters }, payload) {
//       commit('setLoading', true)
//       const user = getters.user
//       firebase.database().ref('/users/' + user.id + '/gamesRegistered').push(payload)
//         .then(() => {
//           commit('userRegisterForGame', payload)
//           commit('setLoading', false)
//         })
//         .catch(error => {
//           console.log(error)
//           commit('setLoading', false)
//         })
//     },
//     userUnregisterFromGame({ commit, getters }, payload) {
//       commit('setLoading', true)
//       const user = getters.user
//       const fb = firebase.database().ref('/users/' + user.id + '/gamesRegistered')
//       fb.once('value')
//         .then(data => {
//           const obj = data.val()
//           for (let key in obj) {
//             if (obj[key] === payload) {
//               fb.child(key).remove()
//             }
//           }
//           commit('userUnregisterFromGame', payload)
//           commit('setLoading', false)
//         })
//         .catch(error => {
//           console.log(error)
//           commit('setLoading', false)
//         })
//     },
//     setError({ commit }, payload) {
//       commit('setError', null)
//     }
//   },
//   getters: {
//     loadedGames(state) {
//       return state.loadedGames.sort((gameA, gameB) => {
//         return gameA.date > gameB.date
//       })
//     },
//     featuredGames(state, getters) {
//       return getters.loadedGames.slice(0, 2)
//     },
//     loadedGame(state) {
//       return (gameId) => {
//         return state.loadedGames.find((game) => {
//           return game.id === gameId
//         })
//       }
//     },
//     user(state) {
//       return state.user
//     },
//     loading(state) {
//       return state.loading
//     },
//     error(state) {
//       return state.error
//     }
//   }
// })
