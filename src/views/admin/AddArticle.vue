<template>
  <div class="add_article_box">
    <el-input
      v-model="title"
      placeholder="请输入标题"
      class="input-with-select"
    >
      <template #prepend>
        <el-select
          v-model="category"
          placeholder="请选择"
        >
          <el-option
            v-for="item in categoryList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
    </el-input>

    <div id="editor">
      <mavon-editor
        ref="md"
        v-model="value"
        code-style="github-gist"
        style="height: 100%"
        @img-add="imgAdd"
        @save="saveHandle"
      />
    </div>

    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :headers="header"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <img
        v-if="coverImg"
        :src="coverImg"
        class="avatar"
      >
      <el-icon
        v-else
        :size="30"
      >
        <plus />
      </el-icon>
    </el-upload>

    <div class="tag_selector">
      <el-select
        v-model="tag"
        multiple
        filterable
        default-first-option
        placeholder="请选择文章标签"
      >
        <el-option
          v-for="item in tagList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <el-input
      v-model="describle"
      class="des_input"
      type="textarea"
      autosize
      placeholder="请输入文章描述"
    />

    <el-button
      type="primary"
      @click="submitHandle"
    >
      {{ id ? '更新' : '完成' }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {
  getCategoryList, getTagList, getArticleDetail, uploadImg, uploadArticle, updateArticle
} from '@/commons/api'
import { BASE_URL } from '@/commons/consts'
import store from '@/store'

interface optionItem {
  value: number,
  label: string
}

const categoryList: optionItem[] = reactive([])
function getCategoryListHandle () {
  getCategoryList().then((res) => {
    if (res.data.reCode === 200) {
      const data = res.data.result.categoryList
      for (let i = 0; i < data.length; i++) {
        const category = data[i]
        categoryList.push({
          value: category.id,
          label: category.name
        })
      }
    }
  })
}
getCategoryListHandle()

const tagList: optionItem[] = reactive([])
function getTagListHandle () {
  getTagList().then((res) => {
    if (res.data.reCode === 200) {
      const data = res.data.result.tagList
      for (let i = 0; i < data.length; i++) {
        const tag = data[i]
        tagList.push({
          value: tag.id,
          label: tag.name
        })
      }
    }
  })
}
getTagListHandle()

const route = useRoute()
const { id } = route.query

const title = ref('')
const category = ref('')
const value = ref('')
const render = ref('')
const describle = ref('')
const coverImg = ref('')
const tag = ref<number[]>([])

function getArticleDetailHandle () {
  getArticleDetail({
    id
  }).then((res) => {
    if (res.data.reCode === 200) {
      const data = res.data.result.detail
      title.value = data.title
      category.value = data.category
      value.value = data.value
      render.value = data.render
      describle.value = data.describle
      coverImg.value = data.cover_img
      const tagList = data.tag.split(',')
      for (let i = 0; i < tagList.length; i++) {
        tagList[i] = parseInt(tagList[i])
      }
      tag.value.push(...tagList)
    }
  })
}
if (id) {
  getArticleDetailHandle()
}

interface uploadRes {
  result: {
    path: string
  }
}

function handleAvatarSuccess (res: uploadRes) {
  console.log(res)
  coverImg.value = `${BASE_URL}/${res.result.path}`
}

const uploadUrl = `${BASE_URL}/v1/admin/uploadImg`
const header = {
  token: store.state.token
}

interface mdElement {
  $img2Url: any
}

const md = ref<mdElement | null>(null)
function imgAdd (pos: string, $file: Blob) {
  console.log(pos)
  console.log($file)

  const formdata = new FormData()
  formdata.append('file', $file)
  uploadImg(formdata).then((res) => {
    console.log(res)
    // eslint-disable-next-line no-unused-expressions
    md.value?.$img2Url(pos, `${BASE_URL}/${res.data.result.path}`)
  })
}

const router = useRouter()

function submitHandle () {
  let reqMethod = uploadArticle
  console.log(id)
  if (id) {
    reqMethod = updateArticle
  }
  reqMethod({
    id,
    title: title.value,
    value: value.value,
    render: render.value,
    category: category.value,
    tag: tag.value,
    describle: describle.value,
    cover_img: coverImg.value
  }).then((res) => {
    if (res.data.reCode === 200) {
      ElMessage({
        message: id ? '更新成功' : '上传成功',
        type: 'success'
      })
      router.replace('/Admin')
    }
  })
}

function saveHandle (v: string, r: string) {
  value.value = v
  render.value = r
}
</script>

<style lang="less">
.add_article_box {
  .el-select .el-input {
    width: 130px;
  }
  #editor {
    margin: 20px auto;
    height: 580px;
  }
  .tag_selector {
    margin-bottom: 20px;
    .el-select .el-input {
      width: 350px;
    }
  }
  .des_input {
    margin-bottom: 20px;
    textarea {
      width: 450px;
    }
  }
  .avatar-uploader .el-upload {
    margin-bottom: 20px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
    height: 178px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 100%;
    display: block;
  }
  .v-note-wrapper .v-note-panel .v-note-show .v-show-content,
  .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
    background-color: #ffffff;
  }
}
</style>
