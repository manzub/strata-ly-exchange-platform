<template>
  <div class="recieveActionSheet">
    <div class="modal fade action-sheet" id="withdrawActionSheet" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Recieve Funds</h5>
          </div>
          <div class="modal-body">
            <div class="action-sheet-content">
              <form @submit.prevent="">
                <div class="form-group basic">
                  <img class="imaged center" :src="qr_code" alt="">
                  <p class="text-center">Scan Qrcode or copy below address</p>
                  <div style="overflow-x:scroll;display:flex">
                    <input id="address" readonly class="form-control" :value="address" />
                    <button @click="copyText" style="border-radius:0px" class="btn btn-outline-secondary" type="button">COPY</button>
                  </div>
                  <div class="input-wrapper">
                    <label class="label" for="account2d">Wallet</label>
                    <select disabled class="form-control custom-select">
                      <option value="0">{{coin.name}} (*** {{ address_end }})</option>
                    </select>
                  </div>
                </div>  

                <div class="form-group basic">
                  <button id="btndone" type="button" class="btn btn-primary btn-block btn-lg"
                  data-dismiss="modal">Close</button>
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
import { mapGetters } from 'vuex';
export default {
  name: 'RecieveActionSheet',
  props: ['coin'],
  data(){ return { qr_code: '', address:'' } },
  computed: {
    ...mapGetters(['auth']),
    address_end() { return this.coin.address.substr(this.coin.address.length-5,this.coin.address.length) }
  },
  created() { 
    this.address = this.coin.address
    this.newQr(this.coin.address);
  },
  methods: {
    newQr(address) {
      var Qrcode = require('qrcode');;
      Qrcode.toDataURL(address, (err, url) => this.qr_code = `${url}`)
    },
    copyText() {
      this.$emit('copyText')
    }
  }
}
</script>

<style scoped>
.action-sheet-content {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.form-control {
  padding-left: 5px !important;
  border: 0.3px solid #e3e3e3 !important;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>