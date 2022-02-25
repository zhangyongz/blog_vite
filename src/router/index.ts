import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import { responseObj } from '../commons/log/types/types/index.d'

// front
import Public from '@/views/front/Public.vue'
import Index from '@/views/front/Index.vue'
import CategoryArticle from '@/views/front/CategoryArticle.vue'
import Archives from '@/views/front/Archives.vue'
import TagArticle from '@/views/front/TagArticle.vue'
import ArchivesSingle from '@/views/front/ArchivesSingle.vue'
import ArticleDetail from '@/views/front/ArticleDetail.vue'

// admin
import Login from '@/views/admin/Login.vue'
import Admin from '@/views/admin/Admin.vue'
import Category from '@/views/admin/Category.vue'
import Tag from '@/views/admin/Tag.vue'
import Article from '@/views/admin/Article.vue'
import AddArticle from '@/views/admin/AddArticle.vue'
import log from '../commons/log'

const routes: Array<RouteRecordRaw> = [
  // 前台
  {
    path: '/',
    component: Public,
    children: [
      {
        path: '/',
        name: 'Index',
        component: Index
      },
      {
        path: '/CategoryArticle',
        name: 'CategoryArticle',
        component: CategoryArticle
      },
      {
        path: '/Archives',
        name: 'Archives',
        component: Archives
      },
      {
        path: '/TagArticle',
        name: 'TagArticle',
        component: TagArticle
      },
      {
        path: '/ArchivesSingle',
        name: 'ArchivesSingle',
        component: ArchivesSingle
      },
      {
        path: '/ArticleDetail',
        name: 'ArticleDetail',
        component: ArticleDetail
      }
    ]
  },
  // 登录
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Admin',
    component: Admin,
    children: [
      // 分类管理
      {
        path: '',
        name: 'Article',
        component: Article
      },
      // 文章管理
      {
        path: '/Category',
        name: 'Category',
        component: Category
      },
      {
        path: '/Tag',
        name: 'Tag',
        component: Tag
      },
      // 添加文章
      {
        path: '/AddArticle',
        name: 'AddArticle',
        component: AddArticle
      }
    ],
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((r) => r.meta.requiresAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
})

function callBack(res: string): void
function callBack(res: responseObj): void
function callBack (res: string | responseObj): void {
  if (typeof res !== 'string') {
    console.log('error')
  }
}

router.afterEach((to) => {
  log.track('viewPage', {
    path: to.path
  }, callBack)
})

export default router
