<template>
  <div>
    <Header/>
    <div id="appCapsule">
      <div class="section full bg-primary p-5">
        <div class="container text-center">
          <img src="assets/img/logo-icon.png" style="width:30%" alt="">
          <h1 class="pt-1 mb-0">{{coin.balance || 0}} {{ coin.name }}</h1>
          <h3 class="text-muted">= ${{coin.usdBalance}}</h3>

          <div class="section mt-2">
            <div class="actions">
              <div class="item">
                <a href="#" data-toggle="modal" data-target="#sendActionSheet">
                  <div class="icon-wrapper bg-primary">
                      <ion-icon name="arrow-up-outline" role="img" class="md hydrated" aria-label="arrow down outline"></ion-icon>
                  </div>
                  <strong>SEND</strong>
                </a>
              </div>
              <div class="item">
                <a href="#" data-toggle="modal" data-target="#withdrawActionSheet">
                  <div class="icon-wrapper bg-success">
                    <ion-icon name="arrow-down-outline" role="img" class="md hydrated" aria-label="copy"></ion-icon>
                  </div>
                  <strong>RECIEVE</strong>
                </a>
              </div>
              <div class="item">
                <a href="#" data-toggle="modal" data-target="#exchangeActionSheet">
                  <div class="icon-wrapper bg-info">
                    <ion-icon name="swap-horizontal-outline" role="img" class="md hydrated" aria-label="more"></ion-icon>
                    <!-- <ion-icon name="copy-outline" role="img" class="md hydrated" aria-label="copy"></ion-icon> -->
                  </div>
                  <strong>SWAP/TRADE</strong>
                  <!-- <strong>COPY</strong> -->
                </a>
              </div>
            </div>
            <transfer-action-sheet :coin="coin"/>
            <recieve-action-sheet @copyText="copyText" :coin="coin"/>
            <exchange-action-sheet :swap="coin" />
          </div>
        </div>
      </div>
      <div class="section mt-3">
        <div class="section-heading">
          <h3 class="title">Transactions</h3>
        </div>
        <div class="transactions">
          <div v-if="transactions.length>0">
            <transaction v-for="(tr,index) in transactions" :key="index" :coin="coin" :transaction="tr" />
          </div>
          <h3 v-else class="text-center text-muted p-5">No Transactions</h3>
        </div>
      </div>
    </div>
    <app-bottom-menu/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '../api';
import AppBottomMenu from '../components/AppBottomMenu.vue';
import ExchangeActionSheet from '../components/ExchangeActionSheet.vue';
import Header from '../components/Header.vue';
import RecieveActionSheet from '../components/RecieveActionSheet.vue';
import Transaction from '../components/Transaction.vue';
import TransferActionSheet from '../components/TransferActionSheet.vue';
export default {
  components: { AppBottomMenu, Header, RecieveActionSheet, TransferActionSheet, Transaction, ExchangeActionSheet },
  data() { return { coin:null, transactions:[] } },
  name:'Coin',
  computed:mapGetters(['auth']),
  methods: {
    copyText() {
      var text = document.querySelector("#address")
      text.select()
      text.setSelectionRange(0, 99999)
      document.execCommand("copy")
      var done_audio = new Audio('assets/audio/audio1.mp3')
      done_audio.play()
      document.querySelector("#btndone").innerHTML = `<ion-icon name="checkmark-circle-outline"></ion-icon>`
      setTimeout(() => {
        document.querySelector("#btndone").innerHTML = `Done`
      }, 1000);
    },
    loadCoin() {
      let selected = window.sessionStorage.getItem('coin');
      let coin = JSON.parse(selected);
      api.coinBalance(coin.name, this.auth.info)
      .then(response => {
        let balance = response.balance ? response.balance : response.btcBalance
        var this_coin = {...coin,usdBalance:response.usdBalance,balance,address:response.address}
        this.coin = this_coin;
        this.loadTransactionLogs();
      })
    },
    loadTransactionLogs() {
      if(this.coin.name == 'STRLY') {
        api.getUserBalances(this.auth.info.walletAddress).then(response=>{
          this.transactions = response.data.logs
        })
        // this.transactions = this.auth.records.logs;
      }else {
        api.getBtcUserLogs(this.auth.info).then(response => {
          this.transactions = response
        })
      }
    }
  },
  created() {
    var self = this;
    var server_timeout_int = 3;
    var script_interval_count = 0;
    load_values()

    function reset_intervals() {
      console.log('fdfd');
      script_interval_count = 0;
      setTimeout(() => {
        load_values()
      }, 30000);
    }

    function load_values() {
      self.loadCoin();
      // setInterval(() => {
      //   // script_interval_count += 1
      //   // if (script_interval_count <= server_timeout_int-1) {
      //     self.loadCoin();
      //     self.loadTransactionLogs();
      //   // }else reset_intervals()
      // }, 5000);
    }
  }
}
</script>

<style scoped>
.actions {
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
}
.section.full.bg-primary {
  background-color: #f5f5f5 !important;
}
.wallet-footer{
    border-top: none;
    padding-top: 0px;
}
.balance.p-3 {
    padding: 1rem !important;
}
.card {
  box-shadow: none;
  background: none;
  background-color: none;
}
.actions .item .icon-wrapper {
  background: #6236FF;
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #fff;
  font-size: 24px;
  margin-bottom: 5px;
}
.actions .item strong {
    display: block;
    color: #27173E;
    font-weight: 500;
    font-size: 11px;
    line-height: 1.2em;
}
</style>