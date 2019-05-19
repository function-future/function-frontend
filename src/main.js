import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import config from '@/config/index'
import Toasted from 'vue-toasted'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VeeValidate from 'vee-validate'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(require('vue-moment'))

Vue.use(Toasted, {
  theme: 'bubble',
  className: 'toaster',
  duration: 4000,
  position: 'bottom-right'
})

Vue.use(mavonEditor)
Vue.use(VeeValidate)

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.config = config

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
