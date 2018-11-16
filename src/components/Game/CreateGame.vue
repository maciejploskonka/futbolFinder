// zmienic wysrodkowanie na jedno dla calosci a nie dla kazdego elementu

<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="mb-5">Create Game</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateGame">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="gameTitle" label="Game title" id="gameTitle" v-model="gameTitle"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="gamePlace" label="Game place" id="gamePlace" v-model="gamePlace"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="gameLevel" label="Game level" id="gameLevel" v-model="gameLevel"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="gameDate" no-title></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="gameTime" format="24hr" no-title></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="mt-5" :disabled="!formIsValid" type="submit">Create game</v-btn>
            </v-flex>
          </v-layout>
          {{ this.gameDate }}
          {{ this.gameTime }}
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        gameTitle: '',
        gamePlace: '',
        gameLevel: '',
        gameDate: null,
        gameTime: null
      }
    },
    computed: {
      formIsValid () {
        return this.gameTitle !== '' && this.gamePlace !== '' && this.gameLevel !== ''
      }
    },
    methods: {
      onCreateGame () {
        if (!this.formIsValid) {
          return
        }
        const gameData = {
          title: this.gameTitle,
          place: this.gamePlace,
          level: this.gameLevel,
          date: this.gameDate,
          time: this.gameTime
        }
        this.$store.dispatch('createGame', gameData)
        this.$router.push('/games')
      }
    }
  }
</script>