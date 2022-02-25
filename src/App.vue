<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: 'App'
}
</script>

<style>
@import url("./assets/font/font.css");

* {
  margin: 0;
  padding: 0;
}
body {
  line-height: 1.5;
  color: #555555;
}
#app {
  min-height: 100vh;
  background-color: #ffffff;
}
</style>
