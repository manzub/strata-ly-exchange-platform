<template>
  <div v-if="isLoggedIn">
    <Header />
    <div id="appCapsule">
      <div class="section p-2 bg-primary">
        <div class="container text-center">
          <h1 class="text-white mb-0">${{allBalances}}</h1>
          <h5 class="text-muted">Combined Balances</h5>
        </div>
      </div>
      <div class="section mt-4">
        <div class="section-heading">
          <h2 class="title">Top Coins</h2>
        </div>
        <div class="transactions mb-2">
          <coinItemLg @selectCoin="selectCoin" v-for="(coin,index) in coins" :key="index" :coin="coin" />
        </div>
      </div>
    </div>
    <app-bottom-menu/>
  </div>
  <div v-else ></div>
</template>

<script>
import api from '../api'
import AppBottomMenu from '../components/AppBottomMenu.vue'
import Header from '../components/Header.vue'
import coinItemLg from '../components/coinItem1.vue';
import { mapGetters } from 'vuex';
import Splash from './Splash.vue';

export default {
  data() { return { coins:[], combined_balances:[] } }, 
  components: { Header, AppBottomMenu, coinItemLg, Splash },
  name: 'Home',
  computed: {
    ...mapGetters(['auth','isLoggedIn']),
    allBalances() {
      let str = 0
      this.combined_balances.forEach(bal => { str += Number(bal) })
      var formatter = Intl.NumberFormat('en-US',{currency:'USD'})
      return formatter.format(str)
    }
  },
  methods: {
    selectCoin(coin) {
      window.sessionStorage.setItem('coin', JSON.stringify(coin));
      this.$router.push('/coin')
    },
    initValues() {
      api.fetchAllCoins().then(response => {
        var combined_balances = []
        response.forEach(coin => {
          // var this_coin = {...coin,rate}
          api.coinBalance(coin.name, this.auth.info)
          .then(response => {
            let balance = response.btcBalance ? response.btcBalance : response.balance || 0
            var toUsd = balance*coin.value;
            combined_balances.push(toUsd)
          })
        })
        this.coins = response;
        this.combined_balances = combined_balances;
      })
    }
  },
  created() {
    if(this.isLoggedIn) {
      this.initValues()
    }else this.$router.replace('/splash')
  }
}
</script>

<style lang="scss" scoped>

</style>