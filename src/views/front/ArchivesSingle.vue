<template>
  <div class="archives_single_box">
    <div class="list">
      <div class="collection_title">
        <h2>
          {{ info.name }}
          <small v-if="to==='category'">分类</small>
          <small v-if="to==='tag'">标签</small>
        </h2>
      </div>
      <div
        v-for="(article, articleIndex) in info.list"
        :key="articleIndex"
        class="article"
        @click="goDetail(article.id)"
      >
        <span class="date">{{ getMothAndDay(article.created_at) }}</span>
        <h3>{{ article.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { reactive } from 'vue'
import { getArticleListByCategory, getArticleListByTag } from '@/commons/api'

interface articleItem {
  id: number,
  'created_at': string,
  title: string
}

interface infoInterface {
  name: string,
  list: articleItem[],
}

const route = useRoute()
const info: infoInterface = reactive({
  name: '',
  list: []
})
const { to } = route.query

function articleListByCategoryHandle () {
  getArticleListByCategory({
    categoryId: route.query.id
  }).then((res) => {
    console.log(res)
    if (res.data.reCode === 200) {
      Object.assign(info, res.data.result)
    }
  })
}

function articleListByTagHandle () {
  getArticleListByTag({
    tagId: route.query.id
  }).then((res) => {
    console.log(res)
    if (res.data.reCode === 200) {
      Object.assign(info, res.data.result)
    }
  })
}

if (to === 'category') {
  articleListByCategoryHandle()
} else {
  articleListByTagHandle()
}

function goDetail (id: number) {
  window.open(`${window.location.origin}/ArticleDetail?id=${id}`)
}

function getMothAndDay (date: string) {
  const mothAndDate = `${date.split('-')[1]}-${date.split('-')[2]}`
  return mothAndDate
}
</script>

<style lang="less">
.archives_single_box {
  margin: 80px auto;
  .list {
    position: relative;
    z-index: 1010;
    font-size: 16px;
    line-height: 2;
    &::after {
      content: " ";
      position: absolute;
      top: 20px;
      left: 0;
      margin-left: -2px;
      width: 4px;
      height: 100%;
      background: #f5f5f5;
      z-index: -1;
    }
    .collection_title {
      position: relative;
      margin: 60px 0;
      h2 {
        margin-left: 20px;
        font-size: 22px;
        small {
          color: #bbb;
          margin-left: 5px;
        }
      }
      &::before {
        content: " ";
        position: absolute;
        left: 0;
        top: 50%;
        margin-left: -4px;
        margin-top: -4px;
        width: 8px;
        height: 8px;
        background: #bbb;
        border-radius: 50%;
      }
    }
    .article {
      display: block;
      position: relative;
      cursor: pointer;
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;
      transition-delay: 0s;
      transition-property: border;
      border-bottom: 1px dashed #ccc;
      text-decoration: none;
      color: #555555;
      &:hover {
        &::before {
          background: #222;
        }
        border-bottom-color: #666;
      }
      .date {
        width: 100px;
        position: absolute;
        font-size: 12px;
        left: 20px;
        top: 5px;
      }
      h3 {
        margin: 20px 0 10px 60px;
        font-size: 16px;
        font-weight: normal;
        line-height: inherit;
      }
      &::before {
        content: " ";
        position: absolute;
        left: 0;
        top: 12px;
        width: 6px;
        height: 6px;
        margin-left: -4px;
        background: #bbb;
        border-radius: 50%;
        border: 1px solid #fff;
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out;
        transition-delay: 0s;
        transition-property: background;
      }
    }
  }
}
</style>
