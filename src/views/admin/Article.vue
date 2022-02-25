<template>
  <div class="article_box">
    <el-table
      :data="tableData"
      border
      style="width: 100%;"
      :height="tableHeight"
    >
      <el-table-column
        prop="id"
        label="id"
        width="60"
      />
      <el-table-column
        prop="created_at"
        label="日期"
        width="100"
      />
      <el-table-column
        prop="title"
        label="标题"
      />
      <el-table-column
        prop="category_name"
        label="分类"
        width="100"
      />
      <el-table-column
        prop="describle"
        label="描述"
        width="300"
      />
      <el-table-column
        prop="tag"
        label="标签"
        width="200"
      />
      <el-table-column
        label="操作"
        width="200"
      >
        <template #default="scope">
          <el-button
            @click="handleEdit(scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      background
      :page-count="totalPages"
      class="paination"
      @current-change="getArticleListHandle"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getArticleList, deleArticle } from '@/commons/api'

const tableHeight = document.documentElement.clientHeight - 200

interface articleItem {
  category: number,
  'category_name': string,
  'cover_img': string,
  'created_at': string,
  describle: string,
  id: number,
  title: string,
  'is_del': null | number
}

const tableData: articleItem[] = reactive([])
const totalPages = ref(1)
const currentPage = ref(1)

function getArticleListHandle (page: number) {
  currentPage.value = page
  getArticleList({
    page,
    pageSize: 15
  }).then((res) => {
    console.log(res)
    if (res.data.reCode === 200) {
      const data = res.data.result
      tableData.length = 0
      tableData.push(...data.articleList)
      const total = data.count / data.pageSize
      totalPages.value = Math.ceil(total)
    }
  })
}
getArticleListHandle(1)

const router = useRouter()

function handleEdit (id: number) {
  router.replace(`/AddArticle?id=${id}`)
}

function deleArticleHandle (id: number) {
  deleArticle({
    id
  }).then((res) => {
    if (res.data.reCode === 200) {
      ElMessage({
        message: '删除成功',
        type: 'success'
      })
      getArticleListHandle(currentPage.value)
    }
  })
}

function handleDelete (id: number) {
  ElMessageBox.confirm('是否确认删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleArticleHandle(id)
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除'
    })
  })
}
</script>

<style lang="less">
.article_box {
  .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .paination {
    padding-top: 30px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
