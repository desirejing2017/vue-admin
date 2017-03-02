<template>
  <header class="head-nav">
     <el-row>
      <el-col :span="4" class='logo-container'>
        <img src="../../assets/logo.png" class='logo' alt="">
      </el-col>
      <el-col :span="16">
        &nbsp
      </el-col>
      <el-col :span="4" class="userinfo">
        <!-- <span class='username'><i class='fa fa-user'></i>{{headerCurRouter}}</span> -->
        <span class='username'>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{userInfo.username}}<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='info'>修改信息</el-dropdown-item>
                <el-dropdown-item command='pass' v-if='userInfo.is_update_pass'>修改密码</el-dropdown-item>
                <el-dropdown-item command='set' v-if='userInfo.pid==0'>系统设置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
        <i class="el-icon-setting logout" @click='logout'></i>
      </el-col>
     </el-row>
  </header>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'head-nav',
    computed: mapGetters({
      headerCurRouter: 'headerCurRouter',
      leftCurRouter: 'leftCurRouter',
      userInfo: 'getUserinfo'
    }),
    methods: {
      logout () {
        this.$confirm('你确定退出登录么?', '确认退出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('remove_userinfo').then(() => {
            this.$router.push('/login')
          })
        })
      }}
  }
</script>

<style scoped lang='less'>
  .logo-container{
    height: 60px;
  }
  .logo{
    height: 50px;
    width: auto;
    margin-left: 10px;
    margin-top: 5px;
  }
  .fa-user{
    position: relative;
    top:-2px;
    margin-right: 4px;
  }
  .head-nav{
    width:100%;
    height: 60px;
    background: #324057;
    position: fixed;
    top:0px;
    left:0px;
    z-index: 999;
    color:#FFF;
    border-bottom: 1px solid #1F2D3D;

    .logout{
      width:60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      float: right;
      cursor: pointer;
    }
  }
  .userinfo{
    text-align: right;
  }
  .username{
    height: 60px;
    line-height: 60px;
    cursor: pointer;

    .el-dropdown{
      color:#FFF;
    }
  }
</style>
