<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Menu from './views/Menu'

export default {
  components: {
    Menu
  }
}
</script>

<style>
  body, html {
    margin: 0;
  }
</style>
