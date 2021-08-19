<template>
  <div>
    <Header/>
    <div id="appCapsule">
      <div class="section full bg-primary">
        <div class="container text-center p-3">
          <ion-icon style="font-size:10vh" class="text-muted md hydrated" role="img" name="swap-horizontal"></ion-icon>
        </div>
      </div>
      <div class="section mt-3">
        <div class="section-heading">
          <h3 class="title">All Coins</h3>
        </div>
        <div class="transactions">
          <coin-item @selectCoin="selectCoin" v-for="(coin, index) in coins" :key="index" :coin="coin" />
        </div>
      </div>
      <exchange-action-sheet :swap="swap" />
    </div>
    <app-bottom-menu />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../api'
import AppBottomMenu from '../components/AppBottomMenu.vue'
import CoinItem from '../components/coinItem.vue'
import ExchangeActionSheet from '../components/ExchangeActionSheet.vue'
import Header from '../components/Header.vue'
export default {
  data() { return { swap:null, coins:[] } },
  components: { AppBottomMenu, Header, CoinItem, ExchangeActionSheet },
  name: 'Swap',
  computed:mapGetters(['auth']),
  methods: {
    selectCoin(coin) {
      this.swap = coin
    }
  },
  created() {
    api.fetchAllCoins().then(response => {
      let coins = []
      response.forEach(coin => {
        api.coinBalance(coin.name, this.auth.info)
        .then(response => {
          let balance = response.balance ? response.balance : response.btcBalance
          var this_coin = {...coin,usdBalance:response.usdBalance,balance,address:response.address}
          coins.push(this_coin);
        })
      })
      this.coins = coins;
    })
  }
}
</script>

<style scoped>
.section.full.bg-primary {
  background-color: #f5f5f5 !important;
}
</style>