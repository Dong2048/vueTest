import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import 'virtual:windi.css'
import {router} from './router'
import store from './store'
import "./pemission"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "nprogress/nprogress.css"
import permission from '~/directives/permission'
const app = createApp(App)
app.use(permission)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
