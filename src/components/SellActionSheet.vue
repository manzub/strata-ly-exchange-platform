<template>
  <div class="modal fade action-sheet" id="sellActionSheet" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Sell  {{coin.name}}</h5>
        </div>
        <div class="modal-body">
          <div class="action-sheet-content">
            <h5 class="">Rate: 1 {{coin.name}} -> <span class="text-dark">${{coin.value}}</span></h5>
            <form @submit.prevent="">
                <div class="form-group basic">
                    <h3 class="text-muted">Balance: {{coin.balance}} {{coin.name}}</h3>
                </div>
              <div class="form-group basic">
                <label class="label">Enter {{coin.name}}</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text text-muted">{{coin.name}}</span>
                  </div>
                  <input id="amount1" type="number" class="form-control form-control-lg" :value="amount">
                  <div class="input-group-addon">
                    <span @click="max" class="btn btn-primary">MAX</span>
                  </div>
                </div>
              </div>
              <div class="form-group basic">
                <button class="btn btn-primary btn-lg btn-block" type="button">Sell</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'SellActionSheet',
    data() {  return { amount:0 } },
    props: ['coin'],
    methods: {
      max() { this.amount = this.coin.balance; }
    }
  }
</script>

<style scoped>
#amount1 {
  font-size: 30px !important;
}
</style>