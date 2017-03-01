<template>
  <div class="home">
    <head-nav></head-nav>
    <div class="left-fixed-right-auto">
      <!-- <left-menu></left-menu> -->
      <div class="right-content">
        <div class="content">
          <!-- <bread></bread> -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import HeadNav from '../Common/HeadNav.vue'
  // import Bread from '../Common/Bread'
  // import Leftmenu from '../Common/LeftMenu'
  export default {
    name: 'home',
    components: {
      HeadNav
      // Bread,
      // Leftmenu
    }
  }

</script>
<style scoped lang='less'>
  .content{
    margin-top: 60px;
    /*background: #f1f2f7;*/
    background: #FFF;
    padding: 16px;
  }
  .right-content{
    margin-bottom: 60px;
  }
</style>

