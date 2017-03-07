<template>
  <div class="form">
    <el-form label-width="100px" style="margin:20px;width:90%;min-width:600px;"
      :model="article_data"
      :rules="rules"
      ref='refArticle'>
      <el-form-item label="文章标题" prop='title' style="width:600px;">
        <el-input v-model="article_data.title"></el-input>
      </el-form-item>
      <el-form-item>
        <vue-editor
          :use-save-button="false"
          :editor-content="article_data.content"
          :editor-toolbar="customToolbar"
          @editor-updated="handleUpdatedContent"
          >
        </vue-editor>
      </el-form-item>    
      <el-form-item label="文章分类" prop='cate'>
        <el-select v-model="article_data.cate" placeholder="请选择文章分类">
          <el-option value="技术"></el-option>
          <el-option value="散文"></el-option>
          <el-option value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标签" prop='tabs'>
        <el-select v-model="article_data.tabs" multiple placeholder="请选择文章标签">
          <el-option value="html"></el-option>
          <el-option value="css"></el-option>
          <el-option value="javascript"></el-option>
          <el-option value="jquery"></el-option>
          <el-option value="vue"></el-option>
          <el-option value="react"></el-option>
          <el-option value="angular"></el-option>
          <el-option value="php"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch on-text="启用" off-text="禁用" v-model="article_data.status" style="width:100%"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click='onSubmit("refArticle")'>立即{{article_data.id ? '修改' : '添加'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {article as ArticleApi} from '../../../config/api.js'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'edit',
  data () {
    return {
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{
          'list': 'ordered'
        },
        {
          'list': 'bullet'
        }],
        ['image', 'code-block']
      ],
      article_data: {
        title: '',
        cate: '其他',
        tabs: ['html'],
        status: true,
        content: ''
      },
      rules: {
        title: [{
          required: true,
          message: '文章标题不能为空！',
          trigger: 'blur'
        }],
        cate: [{
          required: true,
          message: '文章分类不能为空！',
          trigger: 'change'
        }],
        tabs: [{
          type: 'array',
          required: true,
          message: '请至少选择一个文章标签！',
          trigger: 'change'
        }],
        content: [{
          required: true,
          message: '文章不能为空！',
          trigger: 'blur'
        }]
      }
    }
  },
  components: {
    VueEditor
  },
  methods: {
    handleUpdatedContent: function (value) {
      this.article_data.content = value
    },
    onSubmit (formName) {
      var ref = this.$refs[formName]
      ref.validate((valid) => {
        if (valid) {
          if (!this.article_data.content) {
            this.$message.error('文章内容不能为空！')
            return
          }
          ArticleApi.saveArticle.call(this, this.article_data, data => {
            this.$router.push('/article/list')
          })
        }
      })
    }
  },
  mounted () {
    if (this.$route.query.id) {
      let data = {
        id: this.$route.query.id
      }
      ArticleApi.findArticle.call(this, data, (data) => {
        this.article_data = data.article_info
        this.article_data.status = (data.article_info.status === 1)
        this.article_data.tabs = data.article_info.tabs.split(',')
      })
    }
  }
}
</script>

