<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 class="mb-5 text-xs-center">
        <v-btn large to="/game/new" class="primary">Create New Game!</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-btn large to="/games" class="primary">See Our Games!</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :width="15" :size="150"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row v-else>
      <v-carousel class="carousel" style="height: 60vh">
        <v-carousel-item
          v-for="game in games"
          :key="game.id"
          :src="game.img"
          @click="onLoadGame(game.id)"
          style="cursor: pointer"
        >
        <div class="game-description">
          <div>
            {{ game.title}}
          </div>
          <div>
            {{ game.place}}
          </div>
          <div>
            {{ game.date}}
          </div>
          <div>
            {{ game.level}}
          </div>
        </div>
        </v-carousel-item>
      </v-carousel>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      games () {
        return this.$store.getters.featuredGames
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadGame (id) {
        this.$router.push('/games/' + id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .game-description {
    text-align: center;
    margin-top: 4rem;
    font-size: 1.5rem;
    font-weight: bold;
  }
</style>
