// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import './assets/css/app.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

import Utile from './lib/utils'

import echarts from 'echarts'

import vueQuillEditor from 'vue-quill-editor'
Vue.use(vueQuillEditor)

Vue.prototype.$echarts = echarts;
Vue.use(Utile);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
