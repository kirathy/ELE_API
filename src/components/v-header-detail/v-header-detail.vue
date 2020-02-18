<template>
    <transition name="fade">
        <div class="header-detail" v-show="visible">
            <div class="detail-wrapper">
                <div class="detail-main">
                    <div class="name">{{seller.name}}</div>
                    <div class="star-wrapper">
                        <star :size="48" :score="seller.score"></star>
                    </div>
                    <line-title :text="titleText[0]"></line-title>
                    <ul class="supports" v-show="seller.supports">
                        <li class="support-item" v-for="(item,index) in seller.supports" :key="item.id">
                            <support-ico :type="seller.supports[index].type" :size="2"></support-ico>
                            <span class="text">{{seller.supports[index].description}}</span>
                        </li>
                    </ul>
                    <line-title :text="titleText[1]"></line-title>
                    <div class="bulletin">
                        <span class="text">{{seller.bulletin}}</span>
                    </div>
                </div>
            </div>
            <div class="detail-close" @click="hide">
                <i class="icon-close"></i>
            </div>
        </div>
    </transition>
</template>

<script>
  import supportIco from 'components/support-ico/support-ico'
  import star from 'components/star/star'
  import lineTitle from 'components/line-title/line-title'
  import popupMixin from 'common/mixins/popup'

  export default {
    mixins: [popupMixin],
    name: 'v-header-detail',
    props: {
      seller: {
        type: Object,
        default () {
          return {}
        }
      },
      titleText: {
        type: Array,
        default () {
          return ['优惠信息', '商家公告']
        }
      }
    },
    components: {
      supportIco,
      star,
      lineTitle
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~common/stylus/mixin'
    @import '~common/stylus/variable'
    .header-detail
        position fixed
        z-index 100
        top 0
        left 0
        width 100%
        height 100%
        opacity 1
        backdrop-filter blur(10px)
        opacity 1
        color $color-white
        background $color-background-s
        &.fade-enter-active, &.fade-leave-active
            transition all 0.5s
        &.fade-enter, &.fade-leave-to
            opacity 0
        &.fade-enter-to, &.fade-leave
            opacity 1
        .detail-wrapper
            display inline-block
            width 100%
            min-height 100%
            .detail-main
                margin-top 64px
                padding 0 36px 64px 36px
                .name
                    line-height 16px
                    text-align center
                    font-size $fontsize-large
                    font-weight 700
                .star-wrapper
                    margin-top 18px
                    padding 2px 0
                    text-align center

                .supports
                    padding 0 12px
                    .support-item
                        display flex
                        align-items center
                        margin-bottom 12px
                        &last-child
                            margin-bottom 0
                        .support-ico
                            margin-right 6px
                        .text
                            line-height 16px
                            font-size $fontsize-small
                .bulletin
                    padding 0 12px
                    .text
                        padding: 0 12px
                        line-height: 24px
                        font-size: $fontsize-small
        .detail-close
            position relative
            height 32px
            width 32px
            margin -64px auto 0 auto
            clear both
            .icon-close
                font-size: $fontsize-large-xxxx
</style>
