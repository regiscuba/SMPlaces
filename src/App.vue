<template>
  <div id="app">
    <Shelf />
  </div>
</template>

<script>
import Shelf from './components/Shelf.vue'

export default {
  name: 'App',
  components: {
    Shelf
  }
}
</script>

<style lang="scss">
@import './style/main.scss';
</style>
