<template>
  <div>
    <h3 class="text-center mt-5">Coming Soon</h3>
    <!-- <div class="section full bg-primary">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-9">
              <ul class="nav nav-tabs style1" role="tablist">
                <li class="nav-item">
                  <a href="#buy" class="nav-link active" role="tab" data-toggle="tab">Buy</a>
                </li>
                <li class="nav-item">
                  <a href="#sell" class="nav-link" role="tab" data-toggle="tab">Sell</a>
                </li>
              </ul>
            </div>
            <div class="col-3 text-center pt-1 text-primary">
              <router-link to="/swap">
                <ion-icon style="font-size:22px;" name="swap-horizontal-outline" role="img" class="md hydrated" />
                <span style="font-size:10px">SWAP</span>
              </router-link>
            </div>
          </div>
          <hr>
          
          <div class="section full">
            <div class="container text-center mt-5">
              <ion-icon style="font-size:10vh;" role="img" class="text-muted md hydrated" name="stats-chart"></ion-icon>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="tab-content">
      <buy />
      <sell />
    </div> -->

    <app-bottom-menu/>
  </div>
</template>

<script>
import AppBottomMenu from '../components/AppBottomMenu.vue'
import Buy from '../components/Buy.vue'
import Header from '../components/Header.vue'
import Sell from '../components/Sell.vue'
export default {
  components: { AppBottomMenu, Header, Buy, Sell },
  name: 'Market'
}
</script>

<style scoped>
.section.full.bg-primary {
  background-color: #f5f5f5 !important;
}
.card {
  box-shadow: none;
  background: none;
  background-color: none;
}
</style>