<template>
  <div class="register">
    <div id="appCapsule">
      <div class="section mt-2 text-center">
        <h1>Regsiter</h1>
        <h4>Fill the form to sign up</h4>
      </div>
      <div class="section mb-5 p-2">
        <alert v-for="(err,index) in alerts" :key="index" :msg="err" />
        <form @submit.prevent="">
            <div class="card">
              <div class="card-body">
                <div class="form-group basic">
                  <div class="input-wrapper">
                    <label class="label" for="dname">Username</label>
                    <input type="text" v-model="inputs.dname" class="form-control" id="dname" placeholder="Your username">
                    <i class="clear-input">
                      <ion-icon name="close-circle"></ion-icon>
                    </i>
                  </div>
                </div>

                <div class="form-group basic">
                  <div class="input-wrapper">
                    <label class="label" for="email1">E-mail</label>
                    <input type="email" v-model="inputs.email" class="form-control" id="email1" placeholder="Your e-mail">
                    <i class="clear-input">
                      <ion-icon name="close-circle"></ion-icon>
                    </i>
                  </div>
                </div>
    
                <div class="form-group basic">
                  <div class="input-wrapper">
                    <label class="label" for="password1">Password</label>
                    <input type="password" v-model="inputs.password" class="form-control" id="password1" placeholder="Your password">
                    <i class="clear-input">
                      <ion-icon name="close-circle"></ion-icon>
                    </i>
                  </div>
                </div>
    
                <div class="form-group basic">
                  <div class="input-wrapper">
                    <label class="label" for="password2">Password Again</label>
                    <input type="password" v-model="inputs.password2" class="form-control" id="password2" placeholder="Type password again">
                    <i class="clear-input">
                      <ion-icon name="close-circle"></ion-icon>
                    </i>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-links mt-2">
              <div>
                <router-link to="/login">Already have an account?</router-link>
              </div>
            </div>
            <div class="form-button-group transparent">
              <button id="submit" :disabled="loading" type="button" @click="processOnclick" class="btn btn-primary btn-block btn-lg">Register</button>
            </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Alert from '../components/Alert.vue'

export default {
  name: 'Register',
  components: { Alert },
  data () { return { loading: false, inputs: { dname: '', email: '', password: '', password2: '' }, alerts: [] } },
  methods: {
    ...mapActions(['register','login']),
    processOnclick() {
      this.loading = true
      document.querySelector('#submit').innerHTML = "Loading..."
      setTimeout(() => {
        document.querySelector('#submit').innerHTML = "Register"
      }, 2000);

      const { inputs } = this;
      if(inputs.dname != '' && inputs.email != '' && inputs.password != '') {
        if(inputs.password == inputs.password2) {
          this.register(inputs).then((status) => {
            const { email, password } = inputs;
            return status == 200 ? this.login({ email, password }) : null
          }).then(response => {
            if(!response) this.showAlert('An Error occurred')
            else {
              setTimeout(() => {
                this.$router.replace('/splash')
              }, 3000);
            }
          })
        }else this.showAlert('Passwords don\'t match')
      }else this.showAlert('Fill all fields')
    },
    showAlert(msg) {
      this.alerts.push(msg)
      this.loading = false
    }
  }
}
</script>