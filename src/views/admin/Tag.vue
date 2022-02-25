<template>
  <div class="tag_box">
    <div class="add_group">
      <el-input v-model="name" />
      <el-button @click="addTagHandle">
        添加
      </el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;"
      :height="tableHeight"
    >
      <el-table-column
        prop="id"
        label="id"
        width="100"
      />
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        label="操作"
        width="200"
      >
        <template #default="scope">
          <el-button @click="editTagConfirm(scope.row.id)">
            编辑
          </el-button>
          <el-button
            type="danger"
            @click="deleTagHandle(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  addTag, editTag, getTagList, deleTag
} from '@/commons/api'

interface tagItem {
  id: number,
  name: string,
  count: number
}

const name = ref('')
const tableHeight = document.documentElement.clientHeight - 160
const tableData: tagItem[] = reactive([])

function getTagListHandle () {
  getTagList().then((res) => {
    if (res.data.reCode === 200) {
      tableData.length = 0
      tableData.push(...res.data.result.tagList)
    }
  })
}
getTagListHandle()

function addTagHandle () {
  addTag({
    name: name.value
  }).then((res) => {
    console.log(res)
    if (res.data.reCode === 200) {
      ElMessage({
        message: '添加成功',
        type: 'success'
      })
      getTagListHandle()
    }
  })
}

function editTagHandle (id: number, name: string) {
  editTag({
    id,
    name
  }).then((res) => {
    console.log(res)
    if (res.data.reCode === 200) {
      ElMessage({
        message: '编辑成功',
        type: 'success'
      })
      getTagListHandle()
    }
  })
}

function editTagConfirm (id: number) {
  ElMessageBox.prompt('请输入标签名称', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(({ value }) => {
    editTagHandle(id, value)
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消输入'
    })
  })
}

function deleTagHandle (id: number) {
  deleTag({
    id
  }).then((res) => {
    console.log(res)
    ElMessage({
      message: '删除成功',
      type: 'success'
    })
    getTagListHandle()
  })
}
</script>

<style lang="less">
.tag_box {
  .add_group {
    display: flex;
    margin-bottom: 20px;
    .el-input {
      width: 200px;
    }
    button {
      margin-left: 20px;
    }
  }
}
</style>
