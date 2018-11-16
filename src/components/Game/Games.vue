<template>
  <v-container fluid>
    <v-layout row wrap justify-center v-for="game in games" :key="game.id" class="mb-3">
      <v-flex xs12 sm8>
        <v-card class="primary">
          <v-layout row>
            <v-flex xs8>
              <v-card-title primary-title>
                <div>
                  <div>{{ game.title }}</div>
                </div>
              </v-card-title>
              <v-card-text>
                <div>
                  <div>{{ game.place }}</div>
                  <div>{{ game.date }}</div>
                  <div>{{ game.time }}</div>
                  <div>{{ game.level }}</div>
                </div>
              </v-card-text>
            </v-flex>
            <v-flex xs8>
              <v-layout column>
                <v-btn :to="'/games/' + game.id">View Game</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      games () {
        return this.$store.getters.loadedGames
      }
    }
  }
</script>
