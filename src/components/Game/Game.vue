<template>
  <v-container>
    <v-layout row v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :width="15" :size="150"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row v-else>
      <v-flex xs8 offset-xs2>
        <v-card>
          <v-card-title>
            <h2>{{ game.title }} | {{ game.date }} | {{ game.time}}</h2>
            <v-spacer></v-spacer>
            <app-edit-game v-if="userIsGameCreator" :game="game"></app-edit-game>
            <v-btn v-if="!userIsGameCreator" @click="registerUnregister">{{ buttonText }}</v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-layout>
            <v-flex xs7>
              <v-layout>
                <v-flex xs6>
                  <v-card-text>{{ game.level }}</v-card-text>
                  <v-card-text>{{ game.place }}</v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs5 class="pa-2">
              <v-card-media src="http://via.placeholder.com/300x300" height="300"></v-card-media>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['gameId'],
    computed: {
      user () {
        return this.$store.getters.user
      },
      game () {
        return this.$store.getters.loadedGame(this.gameId)
      },
      loading () {
        return this.$store.getters.loading
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsGameCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.game.creatorId
      },
      userIsRegistered () {
        if (this.user) {
          return this.$store.getters.user.gamesRegistered.findIndex(gameId => {
            return gameId === this.gameId
          }) >= 0
        }
      },
      buttonText () {
        if (!this.user) {
          return 'Log to register'
        }
        if (this.userIsRegistered) {
          return 'Unregister'
        } else if (!this.userIsRegistered) {
          return 'Register'
        }
      }
    },
    methods: {
      registerUnregister () {
        if (!this.user) {
          this.$router.push('/signin')
          return
        }
        if (this.userIsRegistered) {
          this.$store.dispatch('userUnregisterFromGame', this.gameId)
        } else if (!this.userIsRegistered) {
          this.$store.dispatch('userRegisterForGame', this.gameId)
        }
      }
    }
  }
</script>
