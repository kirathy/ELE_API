<template>
    <div class="header" @click="showDetail">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64">
            </div>
            <div class="content">
                <div class="title">
                    <div class="brand"></div>
                    <div class="name">{{seller.name}}</div>
                </div>
                <div class="description">
                    蜂鸟专送/{{seller.deliveryTime}}分钟送达
                </div>
                <div class="support" v-if="seller.supports">
                    <support-ico :size=1 :type="seller.supports[0].type"></support-ico>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
                <div class="support-count" v-if="seller.supports">
                    <div class="count">{{seller.supports.length}}个</div>
                    <div class="icon-keyboard_arrow_right"></div>
                </div>
            </div>
        </div>
        <div class="bulletin-wrapper">
            <div class="bulletin-title"></div>
            <div class="bulletin-text">{{seller.bulletin}}</div>
            <div class="icon-keyboard_arrow_right"></div>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
    </div>
</template>

<script>
  import supportIco from 'components/support-ico/support-ico'

  export default {
    name: 'v-header',
    props: {
      seller: {
        type: Object,
        // 如果忘了定义默认值，则获取seller.count等的时候，找不到数据。
        default () {
          return {}
        }
      }
    },
    methods: {
      showDetail () {
        this.headerDetailComp = this.headerDetailComp || this.$createVHeaderDetail({
          $props: {
            seller: this.seller
          }
        })
        this.headerDetailComp.show()
      }
    },
    components: {
      supportIco
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~common/stylus/mixin'
    @import '~common/stylus/variable'
    .header
        position relative
        overflow hidden
        color $color-white
        background $color-background-ss
        .content-wrapper
            position: relative;
            display flex
            align-items top
            padding 24px 12px 18px 24px
            .avatar
                flex 0 0 64px
                width 64px
                margin-right 16px
                img
                    border-radius 2px
            .content
                flex 1
                .title
                    display flex
                    margin-bottom 8px
                    align-items center
                    .brand
                        width 30px
                        height 18px
                        bg-image('brand')
                        background-size 30px 18px
                        background-repeat no-repeat
                    .name
                        margin-left: 6px
                        font-size: $fontsize-large
                        font-weight: bold
                .description
                    margin-bottom: 8px
                    line-height: 12px
                    font-size: $fontsize-small
                .support
                    display flex
                    align-items center
                    .support-ico
                        margin-right: 4px
                    .text
                        line-height: 12px
                        font-size: $fontsize-small-s
                .support-count
                    position: absolute
                    right: 12px
                    bottom: 14px
                    display: flex
                    align-items: center
                    padding: 0 8px
                    height: 24px
                    line-height: 24px
                    text-align: center
                    border-radius: 14px
                    background: $color-background-sss
                    .count
                        font-size: $fontsize-small-s
                    .icon-keyboard_arrow_right
                        margin-left: 2px
                        font-size: $fontsize-small-s
        .bulletin-wrapper
            position relative
            display flex
            align-items center
            height: 28px
            line-height: 28px
            padding: 0 12px
            background: $color-background-sss
            .bulletin-title
                flex: 0 0 22px
                width: 22px
                height: 12px
                margin-right: 4px
                bg-image('bulletin')
                background-size: 22px 12px
                background-repeat: no-repeat
            .bulletin-text
                flex 1
                white-space nowrap
                text-overflow ellipsis
                overflow hidden
                font-size: $fontsize-small-s
            .icon-keyboard_arrow_right
                flex: 0 0 10px
                width: 10px
                font-size: $fontsize-small-s
        .background
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            z-index: -1
            filter: blur(10px)
</style>
