import Vue from 'vue'

// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  /* eslint-disable no-unused-vars */
  Style,
  // basic
  TabBar,
  TabPanels,
  // popup
  Popup,
  Toast,
  Dialog,
  // scroll
  Scroll,
  Slide,
  Sticky,
  ScrollNav,
  ScrollNavBar,
  createAPI
} from 'cube-ui'

Vue.use(TabBar)
Vue.use(TabPanels)
Vue.use(Popup)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Scroll)
Vue.use(Slide)
Vue.use(Sticky)
Vue.use(ScrollNav)
Vue.use(ScrollNavBar)
