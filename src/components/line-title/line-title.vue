<template>
    <div class="line-title">
        <div class="line"></div>
        <div class="text">{{text}}</div>
        <div class="line"></div>
    </div>
</template>

<script>
  export default {
    name: 'line-title',
    props: {
      text: {
        type: String
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .line-title
        display flex
        margin 28px auto 24px auto
        align-items center
        .line
            flex 1
            border-bottom 1px solid rgba(255, 255, 255, 0.2)
        .text
            padding 0 12px
            font-weight 700
            font-size $fontsize-medium
</style>
