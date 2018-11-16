<template>
  <v-app>
    <v-navigation-drawer
      v-model="sideNav"
      temporary
      absolute>
      <v-list>
        <v-list-tile v-for="menuItem in menuItems" :key="menuItem.name" :to="menuItem.link">
          <v-list-tile-action>
            <v-icon>{{ menuItem.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ menuItem.name }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
        @click="sideNav = !sideNav"
        class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title class="title">
        <router-link to="/" tag="span">Futbol Finder</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="menuItem in menuItems" :key="menuItem.name" :to="menuItem.link">
          <v-icon left>{{ menuItem.icon }}</v-icon>
          {{ menuItem.name }}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-xs-only" v-if="userIsAuthenticated" @click="onLogout">
        <v-btn flat>
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  
  data () {
    return {
      sideNav: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'lock', name: 'Sign Up', link: '/signup' },
        { icon: 'lock_open', name: 'Sign In', link: '/signin' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'supervisor_account', name: 'View Games', link: '/games' },
          { icon: 'room', name: 'Organize Game', link: '/game/new' },
          { icon: 'person', name: 'Your Profile', link: '/profile' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('userLogout')
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin-left: 0;
  cursor: pointer;
}
</style>
