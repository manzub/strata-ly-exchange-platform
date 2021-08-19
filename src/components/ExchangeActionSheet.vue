<template>
  <div class="modal fade action-sheet" id="exchangeActionSheet" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Swap</h5>
            </div>
            <div class="modal-body">
                <div class="action-sheet-content">
                    <form @submit.prevent="">
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group basic">
                                    <div class="input-wrapper">
                                        <label class="label" for="currency1">From</label>
                                        <select class="form-control custom-select" id="currency1">
                                            <option value="1">{{ swap.name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group basic">
                                    <div class="input-wrapper">
                                        <label class="label" for="currency2">To</label>
                                        <select @change="selected" class="form-control custom-select" id="currency2">
                                            <option>Select a coin</option>
                                            <option v-if="swap.name == 'BTC'">STRLY</option>
                                            <option v-else>BTC</option>
                                            <!-- <option v-for="(coin, index) in coins" :key="index" :value="coin.name">{{coin.name}}</option> -->
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group-basic">
                            <label class="label">Balance:</label>
                            <strong>{{swap.balance}}</strong>
                        </div>
                        <div class="form-group basic">
                            <label class="label">Enter Amount</label>
                            <div class="input-group mb-0">
                                <div class="input-group-prepend">
                                    <span class="input-group-text text-muted" id="input1">{{swap.name}}</span>
                                </div>
                                <input @keyup="convert" type="number" class="form-control form-control-lg" v-model="amount">
                                <div class="input-group-addon">
                                    <span @click="max" class="btn btn-primary">MAX</span>
                                </div>
                            </div>
                            <small v-if="swap.name == 'STRLY'">Minimum 1,000,000 STRLY</small>
                        </div>
                        <div class="form-group">
                            <p class="text-muted">${{toUsd}}</p>
                        </div>
                        <div class="form-group basic">
                            <button id="trade" :disabled="disabled" @click="process" type="button" class="btn btn-primary btn-block btn-lg">Swap</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '../api'
  export default {
    data() { return { coins:[], disabled: true, exchange_amount: 0, amount: 0, exchange_to: 'strataly', exchange_from: 'btc', toUsd:0 } },
    name: 'ExchangeActionSheet',
    props:['swap'],
    computed: { 
        ...mapGetters(['auth']),
        isSwaping() {
            return this.coins.includes(this.swap)
        } 
    },
    methods: {
        max() {
            var str = this.swap.balance - (this.swap.balance * 0.002);
            this.amount = str.toFixed(8);
            this.convert() 
        },
        convert() {
            var toUsd = this.amount*this.swap.value;
            this.toUsd = toUsd.toFixed(2)
            switch (this.exchange_to) {
                case 'strataly':
                    api.convertUsdToStrata(toUsd).then(response => {
                        this.exchange_amount = response
                    })
                    break;
                case 'btc':
                    if(`${this.amount}`.split('.')[0].length >= 7) {
                        var btc_value = this.coins.find(coin => coin.name == 'BTC').value;
                        var str = toUsd/Number(btc_value)
                        this.exchange_amount = parseInt(toUsd).toFixed(0)
                    }
                    break;
            }
        },
        selected(event) { 
            this.disabled = false;
            var str = event.target.value == 'STRLY' ? 'strataly' : event.target.value;
            var str2 = event.target.value == 'STRLY' ? 'btc' : 'strataly';
            this.exchange_from = str2.toLowerCase()
            this.exchange_to = str.toLowerCase()
        },
        process() {
            this.convert()
            var from_amount = this.exchange_from == 'strataly' ? this.amount : this.toUsd;
            api.swapCoins(this.auth.info, this.exchange_from, this.exchange_to, from_amount, this.exchange_amount)
            .then(response => { 
                var { status } = response;
                if(status == 'signed' || status == 'pending') {
                    var done_audio = new Audio('assets/audio/audio1.mp3')
                    done_audio.play()
                    document.querySelector("#trade").innerHTML = `<ion-icon name="checkmark-circle-outline"></ion-icon>`
                    setTimeout(() => {
                        document.querySelector("#trade").innerHTML = `Done`
                    }, 1000);
                }
            })
        }
    },
    created() {
        api.fetchAllCoins().then(response=>{this.coins = response})
    }
  }
</script>

<style scoped>

</style>