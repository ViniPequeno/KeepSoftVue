<template>
  <div>
    <v-toolbar style = "background-color: #3D3D3D;"
      app
      :clipped-left="clipped"
    >
      <v-spacer></v-spacer>
      <v-toolbar-title><img src="/static/logocurto.png" height="50" id = "img-logo" alt="KeepSoft"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-footer :fixed="fixed" app>
          <v-layout
            column
            align-center
            justify-center
          >
        <span>KeepSoft&copy; 2018</span>
          </v-layout>
      </v-footer>
  </div>
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
