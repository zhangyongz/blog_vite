<template>
  <div class="category_article_box">
    <p class="name">
      categories
    </p>
    <p class="count">
      目前共计{{ categoryList.length }}个分类
    </p>
    <ul class="list">
      <router-link
        v-for="(item, index) in categoryList"
        v-slot="{ navigate }"
        :key="index"
        :to="'/ArchivesSingle?id=' + item.id + '&to=category'"
        custom
      >
        <li @click="navigate">
          <a href="#">{{ item.name }}</a>
          <span class="number">({{ item.count }})</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { getCategoryList } from '@/commons/api'

interface categoryItem {
  id: number,
  name: string,
  count: number
}

const categoryList: categoryItem[] = reactive([])

function getCategoryListHandle () {
  getCategoryList().then((res) => {
    if (res.data.reCode === 200) {
      categoryList.push(...res.data.result.categoryList)
    }
  })
}
getCategoryListHandle()
</script>

<style lang="less">
.category_article_box {
  margin: 80px auto;
  .name {
    font-size: 26px;
    color: #555555;
    text-align: center;
  }
  .count {
    margin-top: 10px;
    color: #555555;
    line-height: 2;
    text-align: center;
    font-size: 16px;
  }
  .list {
    margin-top: 20px;
    li {
      margin: 5px 10px;
      list-style-type: none;
      a {
        line-height: 2;
        font-size: 16px;
        color: #555555;
        text-decoration-color: #cccccc;
        &:hover {
          color: #222222;
          text-decoration-color: #222222;
        }
      }
      .number {
        color: #bbbbbb;
      }
    }
  }
}
</style>
