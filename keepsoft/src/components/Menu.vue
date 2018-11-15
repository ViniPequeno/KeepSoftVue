<template>
  <v-app>
    <v-toolbar style = "background-color: #060606;"
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title><img src="/static/img/arris.png" id = "img-logo" alt="KeepSoft"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    
    <v-content>
      <router-view/>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>KeepSoft&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      title: "Keep Soft"
    };
  }
};
</script>

<style>

</style>
