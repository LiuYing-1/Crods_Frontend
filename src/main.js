import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Echarts from 'vue-echarts'
import { use } from 'echarts/core'

import {
  CanvasRenderer,
} from 'echarts/renderers'
import {
  BarChart,
  PieChart
} from 'echarts/charts'
import {
  TitleComponent,
  LegendComponent,
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  PieChart,
  VisualMapComponent,
  TitleComponent,
  LegendComponent,
  GridComponent,
  TooltipComponent
])

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000'

createApp(App).use(store).use(router, axios).component('v-chart', Echarts).mount('#app')
