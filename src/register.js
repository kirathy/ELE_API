import { createAPI } from 'cube-ui'
import Vue from 'vue'
// import 的名字必须是这个component的name
import VHeaderDetail from 'components/v-header-detail/v-header-detail'
import ShopCartList from 'components/shop-cart-list/shop-cart-list'
import ShopCartSticky from 'components/shop-cart-sticky/shop-cart-sticky'
import Food from 'components/food/food'

createAPI(Vue, VHeaderDetail)
createAPI(Vue, ShopCartList)
createAPI(Vue, ShopCartSticky)
createAPI(Vue, Food)
