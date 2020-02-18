<template>
    <div class="tab">
        <cube-tab-bar
                v-model="selectedLabel"
                :data="tabs"
                :useTransition=false
                :showSlider=true
                ref="tabBar"
                class="border-bottom-1px">
        </cube-tab-bar>
        <div class="slide-wrapper">
            <cube-slide
                    :loop=false
                    :auto-play=false
                    :show-dots=false
                    :options="slideOptions"
                    ref="slide"
                    :initial-index="index"
                    @change="onChange"
                    @scroll="onScroll">
                <cube-slide-item v-for="(tab,index) in tabs" :key="index">
                    <component :is="tab.component" :data="tab.data" ref="component"></component>
                </cube-slide-item>
            </cube-slide>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'tab',
    props: {
      tabs: {
        type: Array,
        default () {
          return []
        }
      },
      initialIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        index: this.initialIndex,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          /* lock y-direction when scrolling horizontally and  vertically at the same time */
          directionLockThreshold: 0
        }
      }
    },
    computed: {
      selectedLabel: {
        get () {
          return this.tabs[this.index].label
        },
        set (newVal) {
          // 查看findIndex的含义，value表示tabs[index]
          this.index = this.tabs.findIndex((value) => {
            return value.label === newVal
          })
        }
      }
    },
    mounted () {
      this.onChange(this.index)
    },
    methods: {
      onChange (current) {
        this.index = current
        const component = this.$refs.component[current]
        component.fetch && component.fetch()
      },
      onScroll (pos) {
        const tabWidth = this.$refs.tabBar.$el.clientWidth
        const slideWidth = this.$refs.slide.slide.scrollerWidth
        const move = -pos.x / slideWidth * tabWidth
        this.$refs.tabBar.setSliderTransform(move)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~common/stylus/variable"
    .tab
        display flex
        flex-direction column
        height: 100%
        >>> .cube-tab
            padding 10px 0
        .slide-wrapper
            flex 1
            overflow: hidden
</style>
