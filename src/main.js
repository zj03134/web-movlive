import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入移动端适配的库，只需要执行即可
import 'amfe-flexible'

// Vant组件库
import {
  NavBar,
  Form,
  Field,
  Button,
  Tabbar,
  TabbarItem,
  Icon,
  Tab,
  Tabs,
  CellGroup,
  Cell,
  List,
  PullRefresh,
  Notify,
  Toast,
  ActionSheet,
  Popup,
  Col,
  Row,
  Badge
} from 'vant'
Vue.use(Col)
Vue.use(Badge)
Vue.use(Row)
Vue.use(ActionSheet)
Vue.use(PullRefresh)
Vue.use(Toast)
Vue.use(Popup)
// 全局注册
Vue.use(Notify)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(List)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
