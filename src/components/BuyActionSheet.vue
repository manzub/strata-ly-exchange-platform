<template>
  <div class="modal fade action-sheet" id="buyActionSheet" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Buy  {{coin.name}}</h5>
        </div>
        <div class="modal-body">
          <div class="action-sheet-content">
            <h5 class="text-center text-muted">How much {{coin.name}} do you want to buy?</h5>
            <form @submit.prevent="">
              <div class="form-group basic">
                <label class="label">Enter Amount</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text text-muted">$</span>
                  </div>
                  <input @keyup="convert" id="amount1" type="number" class="form-control form-control-lg" :value="amount">
                </div>
              </div>
              <div class="form-group basic">
                  <h4 id="converted" class="text-center text-bold bg-secondary p-1">0.000 {{coin.name}}</h4>
              </div>
              <div class="form-group basic">
                <button :disabled="disabled" @click="process" class="btn btn-primary btn-lg btn-block" type="button">Buy</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    name:'BuyActionSheet',
    props: ['coin'],
    data() { return { amount:0, disabled:true, converted:0 } },
    methods: {
      convert(event) {
        let amount = event.target.value;
        let rate = this.coin.rate ? this.coin.rate : this.coin.value
        let str = (amount/Number(rate)).toFixed(8);
        this.converted = str;
        document.querySelector('#converted').innerHTML = `${str} ${this.coin.name}`
        this.disabled = false
      },
      process() {
        if(!this.disabled) {
          let data = {
   "tx_ref":"hooli-tx-1920bbtytty",
   "amount":"100",
   "currency":"NGN",
   "redirect_url":"https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
   "payment_options":"card",
   "meta":{
      "consumer_id":23,
      "consumer_mac":"92a3-912ba-1192a"
   },
   "customer":{
      "email":"user@gmail.com",
      "phonenumber":"080****4528",
      "name":"Yemi Desola"
   },
   "customizations":{
      "title":"Pied Piper Payments",
      "description":"Middleout isn't free. Pay the price",
      "logo":"https://assets.piedpiper.com/logo.png"
   }
}
          axios.post('https://api.flutterwave.com/v3/payments',data, { 
            headers: { 'Authorization':'Bearer FLWSECK-8ea67fd7d97a1cfb6b7f4ab0fb35d0d9-X' } 
          }).then(response=>{
            let {data} = response;
            console.log(data);
            if(data.status=='success') {
              sessionStorage.setItem('req_link',data.data.link);
              this.$router.replace('/buyframe');
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
#amount1 {
  font-size: 30px !important;
}
</style>