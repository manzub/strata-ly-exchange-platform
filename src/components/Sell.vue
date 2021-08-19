<template>
  <div class="tab-pane fade" id="sell" role="tabpanel">
    <div class="section mt-3">
      <div class="transactions">
        <coin-item @selectCoin="selectCoin" v-for="(coin, index) in coins" :key="index" :target="target" :coin="coin" />
      </div>
    </div>
    <sell-action-sheet :coin="selected" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../api'
import coinItem from './coinItem.vue'
import SellActionSheet from './SellActionSheet.vue'
  export default {
  components: { coinItem, SellActionSheet },
    name: 'Sell',
    data() { return { selected:{}, coins: null, target:'#sellActionSheet' } },
    computed: mapGetters(['auth']),
    methods: {
      selectCoin(coin) { this.selected = coin }
    },
    created() {
      api.fetchAllCoins().then(response => {
        let coins = []
        response.forEach(coin => {
          // var this_coin = {...coin,rate}
          api.coinBalance(coin.name, this.auth.info)
          .then(response => {
            let balance = response.balance ? response.balance : response.btcBalance
            var this_coin = {...coin,usdBalance:response.usdBalance,balance,address:response.address}
            // this.coin = this_coin;
            coins.push(this_coin);
          })
        })
        this.coins = coins;
      })
    }
  }
</script>