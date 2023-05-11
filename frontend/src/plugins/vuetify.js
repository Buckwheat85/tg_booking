import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md3 } from 'vuetify/blueprints'

const vDefaultTheme = ((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light')
const colorTheme = (localStorage.getItem('color-theme') == null ? vDefaultTheme : localStorage.getItem('color-theme'))

export default createVuetify({
  blueprint: md3,
  theme: {
    defaultTheme: colorTheme
  },
  components,
  directives,
})