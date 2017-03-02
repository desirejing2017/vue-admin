<template>
  <div class="home">
    <head-nav></head-nav>
    <div class="left-fixed-right-auto">
      <left-menu></left-menu>
      <div class="right-content" :style="{marginLeft:menu_width}">
        <div class="content">
          <bread></bread>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import HeadNav from '../Common/HeadNav.vue'
  import Bread from '../Common/Bread'
  import LeftMenu from '../Common/LeftMenu'
  import {mapGetters} from 'vuex'
  export default {
    name: 'home',
    computed: mapGetters({
      menu_width: 'menu_width'
    }),
    components: {
      HeadNav,
      Bread,
      LeftMenu
    }
  }

</script>
<style scoped lang='less'>
  .right-content{
    padding: 60px 0;
    .content{
      padding: 16px;
      background: #FFF;
    }
  }

</style>

