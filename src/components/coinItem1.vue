<template>
   <a @click="select" class="item pt-5" data-toggle="modal" :data-target="targetProp">
      <div class="detail">
         <img :src="coin.img" alt="" class="imaged image-block w86">
         <div class="det">
            <h2>{{ coin.long }}</h2>
            <h4 class="text-success">${{ coinValue }}</h4>
         </div>
      </div>
   </a>
</template>

<script>
import api from '../api';
   export default {
      name: 'coinItemLg',
      data() { return { to1usd:0 } },
      props: ['coin','target'],
      computed: {
         targetProp() { return this.target ? this.target : '#exchangeActionSheet' },
         coinValue() { return  this.coin.name == 'BTC' ? this.coin.value : parseFloat(this.coin.value).toFixed(8) }
      },
      methods: {
         select() {
            this.$emit('selectCoin', this.coin)
         }
      },
   }
</script>

<style scoped>
/* .det:after {
   content: "\f3d1";
   font-family: "Ionicons";
   font-size: 18px;
   position: absolute;
   right: 16px;
   color: #A9ABAD;
   opacity: 0.6;
   line-height: 1em;
   height: 18px;
   top: 50%;
   margin-top: -9px;
} */
</style>