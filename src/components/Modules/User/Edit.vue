<template>
  <div class="form">
  <el-form style="margin:20px;width:60%;min-width:600px;" 
    label-width="100px" 
    :model="user_data"
    :rules="user_rules"
    ref='user_data'>
    <el-form-item class='edit-form' 
    label="邮箱" 
    prop='email'>
    <el-input v-model="user_data.email" placeholder='常用邮箱'></el-input>
    </el-form-item>
    <el-form-item class='edit-form' 
    label="用户名称" 
    prop='username'>

    <el-input 
      :disabled='user_data.id ? true : false'
      v-model="user_data.username" 
      placeholder='用户名'></el-input>
    </el-form-item>
    <el-form-item label="性别">
    <el-radio-group v-model="user_data.sex">
      <el-radio label="1">男</el-radio>
      <el-radio label="2">女</el-radio>
      <el-radio label="3">保密</el-radio>
    </el-radio-group>
    </el-form-item>
    <el-form-item label="生日">
    <el-col :span="11">
      <el-date-picker style="width: 100%;" type="date" placeholder="选择日期" v-model="user_data.birthday" format='yyyy-MM-dd' @change='onChangeDate'></el-date-picker>
    </el-col>
    </el-form-item>
    <el-form-item class="edit-form" 
    label='地址'
    prop='address'>
    <el-input type='textarea' 
      v-model="user_data.address"
      placeholder='住址'></el-input>
    </el-form-item>
    <el-form-item label="状态">
    <el-switch on-text="启用" off-text="禁用" 
      :disabled='user_data.id ? true : false'
      v-model="user_data.status"></el-switch>
    </el-form-item>
    <el-form-item label="密码" v-if='!user_data.id'>
    创建成功的初始密码为<strong>1234556</strong>
    </el-form-item>
    <el-form-item>
    <el-button type="primary" @click='save_user("user_data")'>{{user_data.id ? '修改' : '添加'}}</el-button>
    <el-button type="default" @click='reset_user("user_data")'>重置</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>
<script>
import {user as UserApi} from '../../../config/api.js'
export default {
  name: 'user',
  data () {
    return {
      user_data: {
        email: '',
        username: '',
        address: '',
        sex: '3',
        status: true,
        birthday: '1992-11-5'
      },
      user_rules: {
        email: [{
          required: true,
          message: '邮箱不能为空！',
          trigger: 'blur'
        }, {
          type: 'email',
          message: '邮箱格式不正确！',
          trigger: 'blur'
        }],
        username: [{
          required: true,
          message: '用户名不能为空！',
          trigger: 'blur'
        }],
        birthday: [{
          required: true,
          message: '生日不能为空！',
          trigger: 'change'
        }],
        address: [{
          required: true,
          message: '地址不能为空！',
          trigger: 'change'
        }]
      }
    }
  },
  methods: {
    save_user (userdata) {
      this.$refs[userdata].validate((valid) => {
        if (valid) {
          UserApi.saveUser.call(this, this[userdata], data => {
            this.$router.push('/user/list')
          })
        }
      })
    },
    reset_user (userdata) {
      this.$refs[userdata].resetFields()
    },

    onChangeDate (val) {
      this.user_data.birthday = val
    }
  },
  mounted () {
    if (this.$route.query.id) {
      UserApi.findUser.call(this, this.$route.query.id, (data) => {
        this.user_data = data.userinfo
        this.user_data.status = (this.user_data.status === 1)
      })
    }
  }
}
</script>
<style scoped>
  .edit-form{
    width:500px;
  }
</style>
