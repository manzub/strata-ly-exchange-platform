<template>
  <div class="login">
    <div id="appCapsule">
      <div class="section mt-2 text-center">
        <h1>Log in</h1>
        <h4>Fill the form to log in</h4>
      </div>
      <div class="section mb-5 p-2">
        <alert v-for="(err,index) in alerts" :key="index" :msg="err" />
        <form @submit.prevent="">
          <div class="card">
            <div class="card-body pb-1">
              <div class="form-group basic">
                <div class="input-wrapper">
                  <label class="label" for="email1">E-mail</label>
                  <input type="email" v-model="inputs.email"  class="form-control" id="email1" placeholder="Your e-mail">
                  <i class="clear-input"><ion-icon name="close-circle"></ion-icon></i>
                </div>
              </div>

              <div class="form-group basic">
                <div class="input-wrapper">
                  <label class="label" for="password1">Password</label>
                  <input type="password" v-model="inputs.password" class="form-control" id="password1" placeholder="Your password">
                  <i class="clear-input"><ion-icon name="close-circle"></ion-icon></i>
                </div>
              </div>
            </div>
          </div>

          <div class="form-links mt-2">
            <div>
              <router-link to="/register">Register Now</router-link>
            </div>
          </div>
          <div class="form-button-group  transparent">
            <button :disabled="loading" id="submit" @click="processLogin" type="button" class="btn btn-primary btn-block btn-lg">Log in</button>
          </div>

      </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Alert from '../components/Alert.vue'

export default {
  name: 'Login',
  components: { Alert },
  data () { return { loading: false, inputs: { email:'', password:'' }, alerts: [] } },
  computed: mapGetters(['isLoggedIn']),
  methods: {
    ...mapActions(['login']),
    processLogin() {
      this.loading = true
      document.querySelector('#submit').innerHTML = "Loading..."
      setTimeout(() => {
        document.querySelector('#submit').innerHTML = "Login"
      }, 2000);

      if(this.inputs.email != '' && this.inputs.password != '') {
        if(navigator.onLine) {
          this.login(this.inputs).then(response => {
            if(!response) this.showAlert('Invalid User Details')
            else {
              setTimeout(() => {
                this.$router.replace('/splash')
              }, 3000);
            }
          })
        }else this.showAlert('Check internet connection')
      }else this.showAlert('Fill all fields')
    },
    showAlert(msg) {
      this.alerts.push(msg)
      this.loading = false
    }
  }
}
</script>