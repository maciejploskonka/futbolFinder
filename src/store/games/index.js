import * as firebase from 'firebase'

export default {
  state: {
    loadedGames: []
  },
  mutations: {
    setLoadedGames (state, payload) {
      state.loadedGames = payload
    },
    createGame (state, payload) {
      state.loadedGames.push(payload)
    },
    updateGame (state, payload) {
      const game = state.loadedGames.find(game => {
        return game.id === payload.id
      })
      if (payload.title) {
        game.title = payload.title
      }
      if (payload.place) {
        game.place = payload.place
      }
      if (payload.level) {
        game.level = payload.level
      }
      if (payload.date) {
        game.date = payload.game
      }
      if (payload.time) {
        game.time = payload.time
      }
    }
  },
  actions: {
    loadGames ({ commit }) {
      commit('setLoading', true)
      firebase.database().ref('games').once('value')
        .then(data => {
          const games = []
          const obj = data.val()
          for (let key in obj) {
            games.push({
              id: key,
              title: obj[key].title,
              place: obj[key].place,
              level: obj[key].level,
              date: obj[key].date,
              time: obj[key].time,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedGames', games)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    createGame ({ commit, getters }, payload) {
      const game = {
        title: payload.title,
        place: payload.place,
        level: payload.level,
        date: payload.date,
        time: payload.time,
        creatorId: getters.user.id
      }
      firebase.database().ref('games').push(game)
        .then(data => {
          console.log(data)
          const key = data.key
          commit('createGame', { ...game, id: key })
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateGame ({ commit }, payload) {
      commit('setLoading', true)
      const updateGame = {}
      if (payload.title) {
        updateGame.title = payload.title
      }
      if (payload.place) {
        updateGame.place = payload.place
      }
      if (payload.level) {
        updateGame.level = payload.level
      }
      if (payload.date) {
        updateGame.date = payload.date
      }
      if (payload.time) {
        updateGame.time = payload.time
      }
      firebase.database().ref('games').child(payload.id).update(updateGame)
        .then(() => {
          commit('setLoading', false)
          commit('updateGame', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    loadedGames (state) {
      return state.loadedGames.sort((gameA, gameB) => {
        return gameA.date > gameB.date
      })
    },
    featuredGames (getters) {
      return getters.loadedGames.slice(0, 2)
    },
    loadedGame (state) {
      return (gameId) => {
        return state.loadedGames.find((game) => {
          return game.id === gameId
        })
      }
    }
  }
}
