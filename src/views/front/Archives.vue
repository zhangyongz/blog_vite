<template>
  <div class="archives_box">
    <div class="list">
      <!-- <span class="archive_move_on"></span>
      <span class="archive_page_counter">嗯..! 目前共计 24 篇日志。 继续努力。</span>-->
      <div
        v-for="(item, index) in articleList"
        :key="index"
      >
        <div class="collection_title">
          <h2>{{ item.time }}</h2>
        </div>
        <div
          v-for="(article, articleIndex) in item.children"
          :key="articleIndex"
          class="article"
          @click="goDetail(article.id)"
        >
          <span class="date">{{ getMothAndDay(article.created_at) }}</span>
          <h3>{{ article.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElLoading } from 'element-plus'
import { getArticleListByDate } from '@/commons/api'

interface articleItem {
  id: number,
  'created_at': string,
  title: string
}

interface dateItem {
  time: string,
  children: articleItem[]
}

const articleList: dateItem[] = reactive([])

function getArticleByDate () {
  const loading = ElLoading.service({
    lock: true,
    text: '加载中'
  })
  getArticleListByDate().then((res) => {
    console.log(res)
    loading.close()
    if (res.data.reCode === 200) {
      Object.assign(articleList, res.data.result)
    }
  }).catch(() => {
    loading.close()
  })
}
getArticleByDate()

function getMothAndDay (date: string) {
  const mothAndDate = `${date.split('-')[1]}-${date.split('-')[2]}`
  return mothAndDate
}

function goDetail (id: number) {
  window.open(`${window.location.origin}/ArticleDetail?id=${id}`)
}
</script>

<style lang="less">
.archives_box {
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
    .archive_move_on {
      position: absolute;
      top: 11px;
      left: 0;
      margin-left: -6px;
      width: 10px;
      height: 10px;
      opacity: 0.5;
      background: #555;
      border: 1px solid #fff;
      border-radius: 50%;
    }
    .archive_page_counter {
      position: relative;
      top: 3px;
      left: 20px;
    }
    .collection_title {
      position: relative;
      margin: 60px 0;
      h2 {
        margin-left: 20px;
        font-size: 22px;
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
      color: #555;
      text-decoration: none;
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
