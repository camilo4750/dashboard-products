import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import Select from 'primevue/select'
import Card from 'primevue/card'
import Paginator from 'primevue/paginator'
import Skeleton from 'primevue/skeleton'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.component('Select', Select)
app.component('Card', Card)
app.component('Paginator', Paginator)
app.component('Skeleton', Skeleton)
app.mount('#app')
