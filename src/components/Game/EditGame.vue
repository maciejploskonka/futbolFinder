<template>
  <v-dialog width="300px" persistent v-model="showEditGame">
    <v-btn slot="activator">Edit Game</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Game</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field name="gameTitle" label="Game title" id="gameTitle" v-model="editedTitle"></v-text-field>
              <v-text-field name="gamePlace" label="Game place" id="gamePlace" v-model="editedPlace"></v-text-field>
              <v-text-field name="gameLevel" label="Game level" id="gameLevel" v-model="editedLevel"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-date-picker v-model="editableDate" no-title width="260"></v-date-picker>
          </v-flex>
          <v-flex xs12>
            <v-time-picker v-model="editableTime" format="24hr" no-title width="260"></v-time-picker>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn @click="onSaveChanges">Save</v-btn>
              <v-btn @click="showEditGame = false">Cancel</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['game'],
    data () {
      return {
        showEditGame: false,
        editedTitle: this.game.title,
        editedPlace: this.game.place,
        editedLevel: this.game.level,
        editableDate: null,
        editableTime: null
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedTitle.trim() === '' || this.editedPlace.trim() === '' || this.editedLevel.trim() === '') {
          return
        }
        this.showEditGame = false
        const newGameDate = this.editableDate
        const newGameTime = this.editableTime
        this.$store.dispatch('updateGame', {
          id: this.game.id,
          title: this.editedTitle,
          place: this.editedPlace,
          level: this.editedLevel,
          date: newGameDate,
          time: newGameTime
        })
      }
    },
    created () {
      this.editableDate = this.game.date
      this.editableTime = this.game.time
    }
  }
</script>