import Vue from 'vue'
import App from './App'
import ProgressBar from './components/ProgressBar'
import store from './store/store'

Vue.config.productionTip = false

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

new Vue({ // eslint-disable-line no-new
  el: '#app',
  store,
  render: h => h(App)
})
