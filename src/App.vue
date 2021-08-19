<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import api from './api'
export default {
  beforeCreate() {
    api.getRates()
  }
}
</script>
