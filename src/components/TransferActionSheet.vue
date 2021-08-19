<template>
  <div class="transferActionSheet">
    <div class="modal fade action-sheet" id="sendActionSheet" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Send Money</h5>
          </div>
          <div class="modal-body">
            <div class="action-sheet-content">
              <form @submit.prevent="">
                <div class="form-group basic">
                  <div class="input-wrapper">
                    <label class="label" for="account2">From</label>
                    <select disabled class="form-control custom-select" id="account2d">
                      <option value="0">{{coin.name}} (*** {{ address_end }})</option>
                    </select>
                  </div>
                </div>

                <div class="form-group basic">
                  <div class="input-wrapper">
                    <label class="label" for="text11">To</label>
                    <input @keyup="validateAddress" type="text" class="form-control" id="text11" placeholder="Enter Wallet Address">
                    <small v-if="inv_add" class="text-danger" >Invalid Wallet Address</small>
                    <i class="clear-input">
                      <ion-icon name="close-circle"></ion-icon>
                    </i>
                  </div>
                </div>

                <div class="form-group basic">
                  <label class="label">Enter Amount</label>
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="input14">{{coin.name}}</span>
                    </div>
                    <input @keyup="calcFees" type="text" class="form-control form-control-lg" placeholder="0">
                  </div>
                </div>
                <p>Gas Fee: <strong class="text-info" >={{ gas_fee }}</strong></p>
                <div class="form-group basic">
                  <button :disabled="buttonDisabled" type="button" class="btn btn-primary btn-block btn-lg"
                  @click="proccessTransact"  id="transact">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../api'
export default {
  name: 'transferActionSheet',
  props:['coin'],
  data() { return { gas_fee: '$0', inv_add:false, buttonDisabled:true, recipient:'', amount:0 } },
  computed: {
    ...mapGetters(['auth']),
    address_end() { return this.coin.address.substr(0,5) }
  },
  methods: {
    isDisabled() { (this.gas_fee != 0 && this.inv_add==false) ? this.buttonDisabled = false : this.buttonDisabled = true },
    validateAddress(event) {
      this.inv_add = true
      if(event.target.value != '' && event.target.value != this.coin.address) {
        navigator.onLine && api.validateExchangeAddress(this.auth.info, this.coin.name, event.target.value).then((response) => {
          if(response) this.inv_add = false
          this.recipient = event.target.value
          this.isDisabled()
        })
      }
    },
    calcFees(event) {
      this.amount = event.target.value
      this.gas_fee = 0
      this.isDisabled()
      if(event.target.value != 0) {
        var num = event.target.value * this.coin.value
        var formatter = new Intl.NumberFormat('en-US', {
          currency:'USD',
          style:'currency'
        })
        this.gas_fee = formatter.format(num)
        this.isDisabled()
      }
    },
    proccessTransact() {
      var transactBtn = document.querySelector("#transact");
      if(!this.buttonDisabled) {
        const { recipient, amount } = this;
        if(navigator.onLine) {
          switch (this.coin.name) {
            case 'BTC':
              let str = Number(this.coin.value)*amount;
              let value = str.toFixed(2);
              api.sendBtc(this.auth.info,value,recipient).then(response=>{
                var { status } = response;
                if(status == 'signed' || status == 'pending') {
                  var done_audio = new Audio('assets/audio/audio1.mp3')
                  done_audio.play()
                  transactBtn.innerHTML = `<ion-icon name="checkmark-circle-outline"></ion-icon>`
                  this.transactBtnDefault()
                  this.buttonDisabled = true
                }else{
                  transactBtn.innerHTML = `<ion-icon name="close-circle-outline"></ion-icon>`;
                  this.transactBtnDefault();
                }
                // console.log(response);
              })
              break;
            case 'STRLY':
              api.sendTransaction({sender:this.auth.info.walletAddress, recipient, amount:Number(amount)}).then(response=>{
                console.log(response);
                if(response.status == 1) {
                  var done_audio = new Audio('assets/audio/audio1.mp3')
                  done_audio.play()
                  transactBtn.innerHTML = `<ion-icon name="checkmark-circle-outline"></ion-icon>`
                  this.transactBtnDefault()
                }else {
                  transactBtn.innerHTML = `<ion-icon name="close-circle-outline"></ion-icon>`;
                  this.transactBtnDefault();
                }
              })
              break;
          }
        }else {
          transactBtn.innerHTML = `<ion-icon name="close-circle-outline"></ion-icon>`;
          this.transactBtnDefault();
        }
      }
    },
    transactBtnDefault() {
      this.buttonDisabled = true
      setTimeout(() => {
        this.buttonDisabled = false
        document.querySelector("#transact").innerHTML = `Send`
      }, 1000);
    }
  }
}
</script>