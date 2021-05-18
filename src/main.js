import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
import '@/styles/show.css'

import '@/styles/echarts.css'

import App from './App'
import router from './router' // 引入路由模块
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

// https://blog.csdn.net/Aria_Miazzy/article/details/103917014
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
