<template>
   <a @click="select" class="item" data-toggle="modal" :data-target="targetProp">
      <div class="detail">
         <img src="assets/img/logo-icon.png" alt="" class="imaged image-block w48">
         <div>
            <h3 class="m-0">{{ coin.name }}</h3>
            <div class="price text-muted" style="font-size:10px;font-weight:900">1 {{coin.name}} -> ${{rate}}</div>
         </div>
      </div>
   </a>
</template>

<script>
import api from '../api';

export default {
   name: 'coinItem',
   props: ['coin','target'],
   computed: {
      targetProp() { return this.target ? this.target : '#exchangeActionSheet' },
      rate() { return this.coin.rate ? this.coin.rate : this.coin.value }
   },
   methods: {
      select() {
         this.$emit('selectCoin', this.coin)
      }
   }
}
</script>

<style scoped>

</style>