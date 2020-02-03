import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import config from '@/config/index'
import VeeValidate from 'vee-validate'
import VueCookies from 'vue-cookies'
import Buefy from 'buefy'
import VueTimers from 'vue-timers'
import '@/assets/css/bulma.scss'
import './registerServiceWorker'

library.add(fas)
library.add(far)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(require('vue-moment'))
Vue.use(VueTimers)

Vue.use(VeeValidate)
Vue.use(VueCookies)
Vue.use(Buefy, {
  defaultIconComponent: 'font-awesome-icon',
  defaultIconPack: 'fas'
})
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.config = config

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
