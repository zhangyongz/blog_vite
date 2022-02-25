<template>
  <div class="tag_article_box">
    <p class="name">
      tags
    </p>
    <p class="count">
      目前共计{{ tagList.length }}个标签
    </p>
    <ul class="list">
      <router-link
        v-for="(item, index) in tagList"
        v-slot="{ navigate }"
        :key="index"
        :to="'/ArchivesSingle?id=' + item.id + '&to=tag'"
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
import { getTagList } from '@/commons/api'

interface tagItem {
  id: number,
  name: string,
  count: number
}

const tagList: tagItem[] = reactive([])

function getTagListHandle () {
  getTagList().then((res) => {
    console.log(res)
    if (res.data.reCode === 200) {
      tagList.push(...res.data.result.tagList)
    }
  })
}
getTagListHandle()
</script>

<style lang="less">
.tag_article_box {
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
