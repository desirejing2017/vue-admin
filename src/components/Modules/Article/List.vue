<template>
  <div class="list">
    <el-col :span="24" class='actions-top'>
      <el-button type='danger' icon='delete' :disabled='batch_flag' @click='onDeleteArticle(true)'>删除选中</el-button>
      <el-button type='info' icon='plus' @click='onEditArticle()'>添加文章</el-button>
      <el-form :inline="true" :model='search_data' class="demo-form-inline">
        <el-form-item>
            <el-input placeholder="标题" v-model='search_data.title'></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click='onSearch'>查询</el-button>
        </el-form-item>
      </el-form>
       
    </el-col>
    
    <el-table border style="width: 100%" align='center' :data="article_list" @selection-change='onSelectionChange'>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center" width="260" sortable="true"></el-table-column>
        <el-table-column prop="title" label="文章标题" align="center" sortable="true"></el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="200" sortable="true" :formatter="formatterStatus" :filters="status.filter.list" :filter-method="filterStatus" :filter-multiple="status.filter.multiple"></el-table-column>

        <el-table-column label="操作" width="200" align="center" :context="_self">
          <template scope='scope'>
            <el-button 
              type="info" 
              icon='view' 
              size="mini"
              @click='onSelectArticle(scope.row)'></el-button>
            <el-button 
              type="info" 
              icon='edit' 
              size="mini"
              @click='onEditArticle(scope.row)'></el-button>
            <el-button 
              type="danger" 
              icon='delete' 
              size="mini"
              @click='onDeleteArticle(scope.row,scope.$index,article_list)'></el-button>
          </template>
        </el-table-column>
    </el-table>

    <el-col :span="24" class='btm-action'>
      <el-pagination
        v-if='paginations.total>0'
        class='pagination'
        :page-sizes="paginations.page_sizes"
        :page-size="paginations.page_size"
        :layout="paginations.layout"
        :total="paginations.total"
        :current-page='paginations.current_page'
        @current-change='onChangeCurrentPage'
        @size-change='onChangePageSize'>
      </el-pagination>
    </el-col>

    <el-dialog size="small" 
      :title="dialog.article_info.title" 
      v-model="dialog.show">
      <div v-html="dialog.article_info.content"></div>
    </el-dialog>

  </div>
</template>

<script>
import {article as ArticleApi} from '../../../config/api.js'
export default {
  name: 'List',
  data () {
    return {
      article_list: [],
      batch_id: '', // 批量删除时这是多个用逗号隔开的id字符串
      batch_flag: true, // 符合批量删除为true,否则为false
      search_data: {
        title: ''
      },
      // 详情弹框信息
      dialog: {
        show: false,
        article_info: {}
      },
      paginations: {
        current_page: 1,
        total: 0,
        page_size: 12,
        page_sizes: [3, 9, 12, 24],
        layout: 'total, sizes, prev, pager, next, jumper'
      },
      status: {
        filter: {
          list: [{
            text: '启用',
            value: 1
          }, {
            text: '禁用',
            value: 2
          }],
          multiple: false
        }
      }
    }
  },
  methods: {

    formatterStatus (item) {
      return item.status === 1 ? '启用' : '禁用'
    },

    filterStatus (value, item) {
      return item.status === value
    },

    onSearch () {
      var query = this.$route.query
      var sd = {}
      for (var p in query) {
        sd[p] = query[p]
      }

      var where = {}

      for (var s in this.search_data) {
        if (this.search_data[s]) {
          where[s] = this.search_data[s]
        } else {
          if (sd[s]) {
            delete sd[s]
          }
        }
      }
      this.getList({
        where,
        fn: () => {
          this.setPath(Object.assign(sd, where))
        }
      })
    },

    /**
     * 获取文章列表
     * @param  {number} options.page      当前页码，切换页码时用
     * @param  {number} options.page_size 每页显示数量，改变每页数量时用
     * @param  {function} options.fn                            } 获取列表后的回调函数
     */
    getList ({
        page,
        pageSize,
        where,
        fn
    } = {}) {
      var query = this.$route.query
      this.paginations.current_page = page || parseInt(query.page) || 1
      this.paginations.page_size = pageSize || parseInt(query.page_size) || this.paginations.page_size
      var data = {
        page: this.paginations.current_page,
        page_size: this.paginations.page_size
      }

      if (where) {
        data = Object.assign(data, where || {})
      } else {
        for (var s in query) {
          if (this.search_data[s] !== undefined) {
            this.search_data[s] = query[s]
            data[s] = query[s]
          }
        }
      }
      ArticleApi.selectArticle.call(this, data, (articleData) => {
        this.article_list = articleData.list.data
        this.paginations.total = articleData.list.total
        fn && fn()
      })
    },

    /**
     * 查看文章信息事件
     * @param  {object} article 当前文章信息对象
     */
    onSelectArticle (article) {
      this.dialog.show = true
      this.dialog.article_info = article
    },

    /**
    * 修改文章
    * @param  {object} article 当前文章信息对象
    */
    onEditArticle (article) {
      if (article && article.id) {
        this.$router.push('/article/edit?id=' + article.id)
      } else {
        this.$router.push('/article/edit')
      }
    },

    /**
     * 表格列表触发CheckBox的事件
     * @param  {array} val 当前选中的用户信息数组，每个元素是用户信息对象
     */
    onSelectionChange (val) {
      // console.log(val);
      if (val.length) {
        this.batch_flag = false
        var ids = []
        for (var i = 0; i < val.length; i++) {
          ids.push(val[i].id)
        }
        this.batch_id = ids.join(',')
      } else {
        this.batch_flag = true
        this.batch_id = ''
      }
    },

    /**
     * 删除文章事件
     * @param  {object || boolean} article  当前文章信息对象或者为布尔值,为布尔值时，代表是批量删除
     * @param  {number} index 当前文章列表索引
     * @param  {array} list  当前文章列表数组
     */
    onDeleteArticle (article, index, list) {
      let id = article === true ? this.batch_id : article.id
      ArticleApi.deleteArticle.call(this, {
        id: id
      }, (data) => {
        if (article === true) {
          this.article_list = this.article_list.filter(function (item, idx) {
            return id.indexOf(item.id) === -1
          })
        } else {
          list.splice(index, 1)
        }
        this.getList()
      })
    },

    /**
     * 改变页码和当前页时需要拼装的路径方法
     * @param {string} field 参数字段名
     * @param {string} value 参数字段值
     */
    setPath (field, value) {
      let path = this.$route.path
      let query = Object.assign({}, this.$route.query)

      if (typeof field === 'object') {
        query = field
      } else {
        query[field] = value
      }

      this.$router.push({
        path,
        query
      })
    },

    /**
     * 改变当前页事件
     * @param  {number} page 当前页码
     */
    onChangeCurrentPage (page) {
      this.getList({
        page,
        fn: () => {
          this.setPath('page', page)
        }
      })
    },

    /**
     * 改变每页显示数量事件
     * @param  {number} size 当前每页显示数量
     */
    onChangePageSize (pageSize) {
      this.getList({
        pageSize,
        fn: () => {
          this.setPath('page_size', pageSize)
        }
      })
    }
  },
  mounted () {
    this.getList({
      fn: () => {
      }
    })
  },
  watch: {
    '$route' (to, from) {
      this.getList(this.article_list)
    }
  }
}

</script>
<style scoped lang='less'>
  .demo-form-inline{
    display: inline-block;
    float: right;
  }
  .btm-action{
    margin-top: 20px;
    text-align: center;
  }
  .actions-top{
    height: 46px;
  }
  .pagination{
    display: inline-block;
  }
</style>

