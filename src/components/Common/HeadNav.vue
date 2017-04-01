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
          <el-dropdown trigger="click" @command='setDialogInfo'>
          <span class="el-dropdown-link">
          {{userInfo.username}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command='info'>修改信息</el-dropdown-item>
          <el-dropdown-item command='pass' v-if='!userInfo.is_update_pass'>修改密码</el-dropdown-item>
          <el-dropdown-item command='set' v-if='userInfo.pid==0'>系统设置</el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>
        </span>
        <i class="el-icon-setting logout" @click='logout'></i>
      </el-col>
    </el-row>
    
    <el-dialog size="tiny" :title="dialog.title" v-model="dialog.show_pass" :modal-append-to-body="false">
      <el-form style="margin:20px;width:80%;" 
      label-width="100px" 
      :model="dialog.user_info"
      :rules="dialog.user_info_rules"
      ref='user_info'>
        <el-form-item class='edit-form' 
          label="邮箱" 
          prop='email'>
          <el-input v-model="dialog.user_info.email" disabled placeholder='常用邮箱'></el-input>
        </el-form-item>
        <el-form-item class='edit-form' 
          label="用户名称" 
          prop='username'>
          <el-input v-model="dialog.user_info.username" disabled placeholder='用户名'></el-input>
        </el-form-item>
        <el-form-item class='edit-form' 
          label="当前密码" 
          prop='old_password'>
          <el-input 
          type='password'
          placeholder='当前密码'
          auto-complete='off'
          v-model="dialog.user_info.old_password"></el-input>
        </el-form-item>
        <el-form-item class='edit-form' 
          label="新密码" 
          prop='password'>
          <el-input 
          type='password'
          placeholder='新密码'
          auto-complete='off'
          v-model="dialog.user_info.password"></el-input>
        </el-form-item>
        <el-form-item class='edit-form' 
          label="确认密码" 
          prop='password_confirm'>
          <el-input 
          type='password'
          placeholder='确认密码'
          auto-complete='off'
          v-model="dialog.user_info.password_confirm"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.show_pass = false">取 消</el-button>
        <el-button type="primary" @click="updUserPass('user_info')">确 定</el-button>
      </span>
    </el-dialog>

  </header>
</template>
<script>
  import {user as UserApi} from '../../config/api.js'
  import {mapGetters} from 'vuex'
  export default {
    name: 'head-nav',
    data () {
      return {
        dialog: {
          show_pass: false,
          title: '修改密码',
          user_info: this.$store.state.user.userinfo,

          user_info_rules: {
            old_password: [{
              required: true,
              message: '旧密码不能为空！',
              trigger: 'blur'
            }],
            password: [{
              required: true,
              message: '新密码不能为空！',
              trigger: 'blur'
            }, {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入密码'))
                } else {
                  if (this.dialog.user_info.password !== '') {
                    this.$refs.user_info.validateField('password_confirm')
                  }
                  callback()
                }
              }
            }],
            password_confirm: [{
              required: true,
              message: '确认密码不能为空！',
              trigger: 'blur'
            }, {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入密码'))
                } else if (value !== this.dialog.user_info.password) {
                  callback(new Error('两次输入密码不一致!'))
                } else {
                  callback()
                }
              }
            }]
          }
        }
      }
    },
    computed: mapGetters({
      headerCurRouter: 'headerCurRouter',
      leftCurRouter: 'leftCurRouter',
      userInfo: 'getUserinfo'
    }),
    methods: {
      setDialogInfo (cmditem) {
        if (!cmditem) {
          this.$message.error('菜单选项缺少command属性')
          return
        }
        switch (cmditem) {
          case 'info':
            this.$router.push({
              path: '/user/edit',
              query: {
                id: this.$store.state.user.userinfo.id
              }
            })
            break
          case 'pass':
            this.dialog.show_pass = true
            this.dialog.title = '修改密码'
            break
        }
      },

      /**
         * 修改密码
         * @param  {object} userinfo 当前修改密码的表单信息
         */
      updUserPass (userinfo) {
        this.$refs[userinfo].validate((valid) => {
          if (valid) {
            UserApi.updPass.call(this, {
              old_password: this.dialog[userinfo].old_password,
              password: this.dialog[userinfo].password,
              password_confirm: this.dialog[userinfo].password_confirm
            }, (data) => {
              this.dialog.show_pass = false
              this.$message.success('修改成功！')
            })
          }
        })
      },

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
      }
    }
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
