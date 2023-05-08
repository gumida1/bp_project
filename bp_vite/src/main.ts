import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
import './samples/node-api'

import './scss/styles.scss'

import store from './store'

import * as bootstrap from 'bootstrap'
import page_info from "./model/page_class";

createApp(App).use(store)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })


