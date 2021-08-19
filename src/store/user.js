import api, { getUserDetails, register } from '../api'
import router from '../router'

const initial_user_state = { token: null, info: null, records: null }

export default {
  state: {
    user: {
      token: window.localStorage.getItem('token'),
      info: JSON.parse(window.localStorage.getItem('user')),
      records: JSON.parse(window.localStorage.getItem('user_data')),
      options: JSON.parse(window.localStorage.getItem('options'))
    }
  },
  getters: {
    isLoggedIn: state => !!state.user.token,
    auth: state => state.user
  },
  mutations: {
    setUser: (state, user) => state.user = user
  },
  actions: {
    logout({ commit }) {
        commit('setUser', initial_user_state)
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('user_data');
        window.localStorage.removeItem('options');
        router.replace("/")
    },
    async login({ commit }, data) {
      var a = false;
      const response = await api.login(data);
      // console.log(response);
      const { status, token } = response.data;
      if(status == 200) {
        a = token;
        window.localStorage.setItem('token', token)
        api.getUserDetails(token).then(user => {
          window.localStorage.setItem('user',JSON.stringify(user))
          // return api.getPaymentSettings({wallet:user.walletAddress, email:user.email})
          return user
        }).then(data => {
          // const options = data.data.data;
          window.localStorage.setItem('options', JSON.stringify({address:null}));
          // return api.getUserBalances(data.wallet)
          return api.getUserBalances(data.walletAddress)
        }).then(records => {
          if(records.status == 1) {
            window.localStorage.setItem('user_data', JSON.stringify(records.data))
            return 1
          }
        }).then(statusCode => {
          if(statusCode == 1) {
            let info = JSON.parse(window.localStorage.getItem('user'))
            let records = JSON.parse(window.localStorage.getItem('user_data'))
            let options = JSON.parse(window.localStorage.getItem('options'))
            commit('setUser', { token, info, records, options })
          }
        })
      }
      return a;
    },
    async register(state, data) {
      const { dname:name, email, password } = data;
      const response = await api.register({name, email, password});
      // console.log(response.data);
      return response.data.status;
    }
  }
}
