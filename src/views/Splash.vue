<template>
    <div id="appCapsule">
        <div class="section">
            <div class="splash-page mt-5 mb-5">
                <div class="mb-3"><img src="assets/img/strataly-icon.png" alt="image" class="imaged w-50 square"></div>
                <h2 class="mb-2">Welcome to Strata.ly Wallet!</h2>
                <p>Your personal wallet app just for your strata coin.</p>
            </div>
        </div>

        <div class="fixed-bar">
            <div class="row">
                <div class="col-6">
                    <router-link to="login" class="btn btn-lg btn-outline-secondary btn-block">Log In</router-link>
                </div>
                <div class="col-6">
                    <router-link to="register" class="btn btn-lg btn-primary btn-block">Sign Up</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '../api'
export default { 
    name: 'Splash',
    beforeCreate() { api.getRates() },
    computed: mapGetters(['isLoggedIn']),
    created() {
        if(this.isLoggedIn){
            setTimeout(() => {
                this.$router.replace('/')
            }, 3000);
        }
    }
}
</script>
