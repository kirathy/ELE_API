<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav
              :side=true
              :data="goods"
              :options="scrollOptions"
              v-if='goods.length'>
        <template slot="bar" slot-scope="props">
          <cube-scroll-nav-bar
                  direction="vertical"
                  :labels="props.labels"
                  :txts="barTxts"
                  :current="props.current"
          >
            <template slot-scope="props">
              <div class="text">
                <div class="support-wrapper">
                  <support-ico
                          v-if="props.txt.type>=1"
                          :size=3
                          :type="props.txt.type"
                  ></support-ico>
                </div>
                <span>{{props.txt.name}}</span>
                <span class="num" v-if="props.txt.count">
                                    <bubble :num="props.txt.count"></bubble>
                                </span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel
                v-for="good in goods"
                :key="good.name"
                :label="good.name"
                :title="good.name">
          <ul>
            <li v-for="food in good.foods" :key="food.name" class="food-item border-bottom-1px"
                @click="selectFood(food)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <div class="name">{{food.name}}</div>
                <div class="desc">{{food.description}}</div>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control :food="food" @add="onAdd"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <div class="shop-cart-wrapper">
      <shop-cart
              ref="shopCart"
              :select-foods="selectFoods"
              :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice">
      </shop-cart>
    </div>
  </div>
</template>

<script>
  import { getGoods } from 'api'
  import ShopCart from 'components/shop-cart/shop-cart'
  import CartControl from 'components/cart-control/cart-control'
  import SupportIco from 'components/support-ico/support-ico'
  import Bubble from 'components/bubble/bubble'
  // import { saveToLocal, loadFromLocal } from 'common/js/storage'
  //
  // const KEY = 'selectFoods'
  export default {
    name: 'goods',
    props: {
      data: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        goods: [],
        scrollOptions: {
          click: false,
          directionLockThreshold: 0
        },
        selectedFood: {}
      }
    },
    // created () {
    //   this.goods = loadFromLocal(this.seller.id, KEY, [])
    // },
    computed: {
      seller () {
        return this.data.seller
      },
      selectFoods () {
        const foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        // saveToLocal(this.seller.id, 'selectFoods', this.goods)
        return foods
      },
      barTxts () {
        const ret = []
        this.goods.forEach((good) => {
          const { type, name, foods } = good
          let count = 0
          foods.forEach((food) => {
            count += food.count || 0
          })
          ret.push({
            type,
            name,
            count
          })
        })
        return ret
      }
    },
    methods: {
      fetch () {
        if (!this.fetched) {
          this.fetched = true
          getGoods({
            id: this.seller.id
          }).then((goods) => {
            this.goods = goods
          })
        }
      },
      onAdd (ele) {
        this.$refs.shopCart.drop(ele)
      },
      selectFood (food) {
        this.selectedFood = food
        this._showFood()
        this._showShopCartSticky()
      },
      _showFood () {
        this.foodComp = this.foodComp || this.$createFood({
          $props: {
            food: 'selectedFood'
          },
          $events: {
            leave: () => {
              this._hideShopCartList()
            },
            add: (el) => {
              this.shopCartStickyComp.drop(el)
            }
          }
        })
        this.foodComp.show()
      },
      _showShopCartSticky () {
        this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
          $props: {
            selectFoods: 'selectFoods',
            deliveryPrice: this.seller.deliveryPrice,
            minPrice: this.seller.minPrice,
            fold: true
          }
        })
        this.shopCartStickyComp.show()
      },
      _hideShopCartList () {
        this.shopCartStickyComp.hide()
      }
    },
    components: {
      ShopCart,
      CartControl,
      SupportIco,
      Bubble
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  .goods
    position relative
    height 100%
    .scroll-nav-wrapper
      position absolute
      width 100%
      top 0
      left 0
      bottom 48px
    >>> .cube-scroll-nav-bar
      white-space normal
      overflow hidden
    >>> .cube-scroll-nav-bar-item
      padding 0 10px
      display flex
      align-items center
      height 56px
      width 60px
      line-height 14px
      font-size $fontsize-small
      background $color-background-ssss
      border-bottom 1px solid $color-row-line
      .text
        flex 1
        position relative
      .num
        position absolute
        right -8px
        top -10px
      .support-wrapper
        display inline-block
        margin-right 4px
    >>> .cube-scroll-nav-bar-item_active
      background $color-white
      color $color-dark-grey
      span
        font-weight 700
    >>> .cube-scroll-nav-panel-title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid $color-col-line
      font-size $fontsize-small
      color $color-grey
      background $color-background-ssss
    .food-item
      position relative
      display flex
      margin 18px
      padding 0 18px 18px 0
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size $fontsize-medium
          color $color-dark-grey
        .desc, .extra
          line-height 10px
          font-size $fontsize-small-s
          color $color-light-grey
        .desc
          line-height 12px
          margin-bottom 8px
          white-space nowrap
          text-overflow ellipsis
        .extra
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .old
            text-decoration line-through
            font-size $fontsize-small-s
            color $color-light-grey
          .now
            margin-right 8px
            font-size $fontsize-medium
            color $color-red
        .cart-control-wrapper
          position: absolute
          right: 0
          bottom: 12px
    .shop-cart-wrapper
      position absolute
      left 0
      bottom 0
      z-index 50
      width 100%
      height 48px
</style>
