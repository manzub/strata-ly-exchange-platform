export default {
  guest: function({ next, store }) {
    if(store.getters.isLoggedIn) return next({ path: '' })
    return next()
  },
  authCheck: function({ next, store }) {
    if(!store.getters.isLoggedIn) return next({ path: '' })
    return next()
  }
}