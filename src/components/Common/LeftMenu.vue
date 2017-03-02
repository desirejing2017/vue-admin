<template>
  <div class="left" :style="{'width':menu_width}" id='admin-left'>
    <div id='left-menu'>
      <el-row class='tac'
        v-for="(route,index) in $router.options.routes" 
        v-if='!route.hidden && $route.matched.length && $route.matched[0].path===route.path'>
        <el-col :span="24">
          <el-menu 
            class="el-menu-vertical-demo" 
            theme="dark"
            :default-active="$route.path"
            unique-opened 
            router>
            <template 
              v-for="(item,index) in route.children" 
              v-if="!item.hidden">
              <el-submenu 
                :index="item.path">
                <template 
                  slot="title">
                  <el-tooltip 
                    class="item" 
                    effect="dark"
                    placement="right"
                    :disabled="menu_flag" 
                    :content="item.name">
                     <i :class="'fa fa-'+item.icon"></i>
                  </el-tooltip>
                  <span 
                    class='menu-name' 
                    v-if="menu_flag">{{item.name}}</span>
                </template>
                <el-menu-item 
                  v-for='(child,cindex) in item.children' 
                  v-if="!child.hidden"
                  :style="{'padding-left':menu_flag? '40px' : '23px'}"
                  :index='headerCurRouter+"/"+item.path+"/"+child.path'>
                  <el-tooltip 
                    class="item" 
                    effect="dark" 
                    placement="right"
                    :disabled="menu_flag" 
                    :content="child.name">
                    <i :class="'fa fa-'+child.icon"></i>
                  </el-tooltip>
                  <span 
                    class='menu-name' 
                    v-if="menu_flag">{{child.name}}</span>
                </el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-col>
      </el-row>
      <div class="toggle-menu" @click='toggleMenu'>
        <i class='el-icon-arrow-left'></i>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'left-menu',
    computed: mapGetters({
      menu_width: 'menu_width',
      menu_flag: 'menu_flag',
      headerCurRouter: 'headerCurRouter'
    }),
    data () {
      return {
        menu_list: []
      }
    },
    methods: {

      toggleMenu () {
        this.$store.dispatch(this.menu_flag ? 'set_menu_close' : 'set_menu_open')
      },

      updateCurMenu (routeInfo) {
        let route = routeInfo || this.$route
        if (route.matched.length) {
          let rootPath = route.matched[0].path
          let fullPath = route.path
          this.$store.dispatch('set_cur_route', {
            rootPath,
            fullPath
          })
          var routes = this.$router.options.routes
          for (var i = 0; i < routes.length; i++) {
            if (routes[i].path === rootPath && !routes[i].hidden) {
              this.menu_list = routes[i].children
              break
            }
          }
        } else {
          this.$router.push('/404')
        }
      }

    },
    created () {
      this.updateCurMenu()
    },
    watch: {
      $route (to, from) {
        this.updateCurMenu(to)
      }
    }
  }
</script>

<style scoped lang='less'>
  .fa{
    margin-right: 8px;
  }
  .left-fixed-right-auto{
    padding-top: 60px;
  }
  .left{
    height: 100%;
    position:fixed;
    top:60px;
    /* float:left; */
    /*width:190px;
    margin-right:-190px;*/
    
  }
  .right-content{
    float:right;
    width:100%;
  }
  #left-menu{
    height: 100%;
    background: #324057;
    position: relative;
    overflow-x: hidden;

    .toggle-menu{
      width: 100%;
      height: 50px;
      background: #1f2f3d;
      position: absolute;
      bottom: 50px;
      left: 0px;
      z-index: 1000;
      cursor: pointer;
      line-height: 40px;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
  }
</style>
