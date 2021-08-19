<template>
  <a class="tr item">
    <div class="detail">
      <img src="assets/img/logo-icon.png" alt="" class="image-block imaged w48">
      <div>
        <div class="mb-05"><strong>{{title ? "Transfered" : "Recieved"}}</strong></div>
        <div class="text-small mb-05">{{sub}}</div>
      </div>
    </div>
    <div class="right">
      <div :class="value_class" >{{transaction.value}} {{coin.name}}</div>
    </div>
  </a>
</template>

<script>
  export default {
    name:'Transaction',
    props:['transaction','coin'],
    computed: {
      title() { return this.coin.address != this.transaction.to },
      sub() { return this.title ? `To: ${this.transaction.to}`.substr(0,10) : `From: ${this.transaction.from}`.substr(0,10) },
      value_class() { return this.title ? "text-danger" : "text-success" }
    }
  }
</script>

<style lang="scss" scoped>

</style>