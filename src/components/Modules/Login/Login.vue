<template>
  <div class="login">
    <el-form label-position="left" label-width="0px" class="loginform"
    :model='data'
    :rules="rule_data"
    ref='data'>
      <h3 class="title">系统登录</h3>
      <el-form-item prop='username'>
        <el-input type="text" auto-complete="off" placeholder="账号" v-model='data.username'></el-input>
      </el-form-item>
      <el-form-item prop='password'>
        <el-input type="password" auto-complete="off" placeholder="密码" v-model='data.password' @keyup.enter="login('data')"></el-input>
      </el-form-item>
      <el-checkbox checked>记住密码</el-checkbox>
      <el-form-item style="margin: 30px 0 0 0">
        <el-button type="primary" @click='login("data")'>登录</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {user as UserApi} from '../../../config/api.js'

export default {
  name: 'Login',
  data () {
    return {
      data: {
        username: '',
        password: ''
      },
      rule_data: {
        username: [{
          required: true,
          message: '用户名不能为空！',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '密码不能为空！',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    login (ref) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
          // this.$store.dispatch('login', this[ref])
          UserApi.login.call(this, this[ref], data => {
            // console.log(data);
            this.$store.dispatch('update_userinfo', {
              userinfo: data.userinfo
            }).then(() => {
              this.$router.push('/module/user/list')
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
  .login{
    background: #1F2D3D;
    width: 100%;
    height: 100%;
    text-align: left;

    .loginform {
      width: 350px;
      height: 340px;
      padding: 35px;
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-color: #F9FAFC;
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -170px 0 0 -175px;

      .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
      }
    }  
  }
</style>
