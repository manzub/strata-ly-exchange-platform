<template>
  <div class="appBottomMenu">
    <router-link to="/" :class="active('')">
      <div class="col">
        <ion-icon name="home"></ion-icon>
        <strong>Home</strong>
      </div>
    </router-link>
    <router-link to="/market" :class="active('market')">
      <div class="col">
        <ion-icon name="swap-horizontal"></ion-icon>
        <strong>Market</strong>
      </div>
    </router-link>
    <router-link to="/settings" :class="active('settings')">
      <div class="col">
        <ion-icon name="cog" />
        <strong>Settings</strong>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'appBottomMenu',
    methods: {
      active(page) {
        var route = window.location.href.split("#/")[1]
        if(route == page) return "item active"
        else if(page == "" && ['#buy',"#sell","coin"].includes(route)) return "item active"
        else return "item"
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>