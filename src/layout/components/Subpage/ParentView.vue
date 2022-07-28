<template>
  <keep-alive :include="cacheList" :exclude="notCacheName">
    <router-view ref="child" />
  </keep-alive>
</template>
<script>
export default {
  name: 'ParentView',
  computed: {
    key() {
      return this.$route.path
    },
    notCacheName() {
      return [(this.$route.meta && this.$route.meta.noCache) ? this.$route.name : '']
    },
    cacheList() {
      /*     let list = []
      list = ['ParentView', ...this.$store.state.tagsView.visitedViews ? this.$store.state.tagsView.visitedViews.filter(item => !(item.meta && item.meta.noCache)).map(item => item.name) : []]
      return list*/
      // return this.$store.state.tagsView.cachedViews

      return ['ParentView', ...this.$store.state.tagsView.cachedViews]
    }
  }
}
</script>
