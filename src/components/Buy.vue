<template>
  <div class="tab-pane fade show active" id="buy" role="tabpanel">
    <div class="section mt-3">
      <div class="transactions">
        <coin-item @selectCoin="selectCoin" v-for="(coin, index) in coins" :key="index" :coin="coin" :target="target" />
      </div>
    </div>
    <buy-action-sheet :coin="selected" />
  </div>
</template>

<script>
import api from '../api'
import BuyActionSheet from './BuyActionSheet.vue'
import coinItem from './coinItem.vue'
  export default {
    components: { coinItem, BuyActionSheet },
    name: 'Buy',
    data() { return { selected:{}, coins: null, target:'#buyActionSheet' } },
    methods: {
      selectCoin(coin) { this.selected = coin }
    },
    created() {
      api.fetchAllCoins().then(response => {
        // this.coins = response;
        let coins = []
        response.forEach(coin => {
          let num = coin.value*0.0002;
          var rate = Number(coin.value)+num;
          var this_coin = {...coin,rate}
          coins.push(this_coin);
        })
        this.coins = coins;
      })
    }
  }
</script>