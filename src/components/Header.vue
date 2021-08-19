<template>
  <div :class="appHeaderBg">
    <div class="left">
      <a v-if="showBack" @click="goBack" :class="headerButton">
        <ion-icon name="chevron-back-outline"></ion-icon>
      </a>
    </div>
    <!-- <div class="pageTitle">{{ pageTitle }}</div> -->
    <img :src="titleSrc" width="50%" />
    <div class="right">
      <a @click="refresh" v-if="isLoggedIn" :class="headerButton">
        <ion-icon name="refresh-outline"></ion-icon>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapGetters(['isLoggedIn']),
    pageTitle() {
      const { parent } = this.$options
      const { name } = parent.$options
      const excepts = ['Login', 'Register'];
      return  excepts.includes(name) ? null : name
    },
    appHeaderBg() { return ['Home','Exchange'].includes(this.pageTitle) ? "appHeader bg-primary" : "appHeader bg-white" },
    headerButton() { return this.appHeaderBg.split(" ")[1] == 'bg-primary' ? 'headerButton text-white' : 'headerButton' },
    showBack: () => window.location.href.split("#")[1] != "/" ? true : false,
    titleSrc() {
      return this.appHeaderBg.split(" ")[1] == 'bg-primary' ? 'assets/img/logo.png' : 'assets/img/strataly-icon.png'
    }
  },
  methods: {
    goBack: () => window.history.go(-1),
    refresh: () => window.location.href = window.location.href.split("#/")[0]
  }
}
</script>

<style lang="scss" scoped>

</style>