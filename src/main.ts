import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import routerCount from 'router-count'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(mavonEditor)
app.mount('#app')

routerCount(router, () => {
  console.log('routerBack')
})

export default app
