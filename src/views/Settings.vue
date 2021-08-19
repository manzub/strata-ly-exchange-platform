<template>
  <div>
    <Header />
    <div id="appCapsule">
      <div class="section mt-3 text-center">
        <div class="avatar-section">
          <a href="#">
            <img :src="profileimg" alt="avatar" class="imaged w100 rounded">
            <span class="button">
              <ion-icon name="camera-outline"></ion-icon>
            </span>
          </a>
        </div>
      </div>
      <div class="listview-title mt-1">Preferences</div>
        <ul class="listview image-listview text inset">
          <li>
            <div class="item">
              <div class="in">
                <div>
                  Payment Alert
                  <div class="text-muted">
                    Send Email when new payment received
                  </div>
                </div>
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="customSwitch4" disabled/>
                  <label class="custom-control-label" for="customSwitch4"></label>
                </div>
              </div>
            </div>
          </li>
          <li>
            <a href="#" class="item">
              <div class="in">
                <div>Notification Sound</div>
                <span class="text-primary">Click</span>
              </div>
            </a>
          </li>
        </ul>
        <div class="listview-title mt-1">Security</div>
        <ul class="listview image-listview text mb-2 inset">
          <li>
            <a @click="logout" class="item">
              <div class="in">
                <div class="text-danger">Log out of this device</div>
              </div>
            </a>
          </li>
        </ul>
    </div>
    <app-bottom-menu />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AppBottomMenu from '../components/AppBottomMenu.vue'
import Header from '../components/Header.vue'
  export default {
    components: { Header, AppBottomMenu  },
    name: 'Settings',
    computed: {
      ...mapGetters(['auth']),
      profileimg() { return this.auth.info.profile_photo_url }
    },
    methods: mapActions(['logout'])
  }
</script>