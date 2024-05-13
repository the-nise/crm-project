import './assets/main.css'
import 'primevue/resources/themes/lara-light-green/theme.css'
import 'bulma/css/bulma.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Sidebar from 'primevue/sidebar'
import Dropdown from 'primevue/dropdown'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import ProgressSpinner from 'primevue/progressspinner'
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmPopup from 'primevue/confirmpopup'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Plugins
app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)

// Global components
app.component('PButton', Button)
app.component('PInputText', InputText)
app.component('PDataTable', DataTable)
app.component('PColumn', Column)
app.component('PSidebar', Sidebar)
app.component('PDropdown', Dropdown)
app.component('PToast', Toast)
app.component('PProgressSpinner', ProgressSpinner)
app.component('PConfirmPopup', ConfirmPopup)

// Mount app
app.mount('#app')
