import { AxiosResponse } from 'axios'
import { LocationQueryValue } from 'vue-router'
import http from '@/commons/http'

export function getCount (): Promise<AxiosResponse> {
  return http.get('/v1/front/count')
}

interface getArticleListParams {
  page: number,
  pageSize?: number
}

export function getArticleList (params: getArticleListParams): Promise<AxiosResponse> {
  return http.get('/v1/front/articleList', {
    params
  })
}

interface queryId {
  id: LocationQueryValue | LocationQueryValue[]
}

export function getArticleDetail (params: queryId): Promise<AxiosResponse> {
  return http.get('/v1/front/article', {
    params
  })
}

export function getCategoryList (): Promise<AxiosResponse> {
  return http.get('/v1/front/categoryList')
}

interface queryCategoryId {
  categoryId: LocationQueryValue | LocationQueryValue[]
}

export function getArticleListByCategory (params: queryCategoryId): Promise<AxiosResponse> {
  return http.get('/v1/front/articleListByCategory', {
    params
  })
}

interface queryTagId {
  tagId: LocationQueryValue | LocationQueryValue[]
}

export function getArticleListByTag (params: queryTagId): Promise<AxiosResponse> {
  return http.get('/v1/front/articleListByTag', {
    params
  })
}

export function getArticleListByDate (): Promise<AxiosResponse> {
  return http.get('/v1/front/articleListByDate')
}

export function getTagList (): Promise<AxiosResponse> {
  return http.get('/v1/front/tagList')
}

interface loginInParams {
  username: string,
  password: string
}

export function login (data: loginInParams): Promise<AxiosResponse> {
  return http.post('/v1/admin/login', data)
}

interface deleArticleParams {
  id: number
}

export function deleArticle (data: deleArticleParams): Promise<AxiosResponse> {
  return http.post('/v1/admin/deleteArticle', data)
}

export function uploadImg (data: FormData): Promise<AxiosResponse> {
  return http.post('/v1/admin/uploadImg', data)
}

interface uploadArticleParams {
  id?: LocationQueryValue | LocationQueryValue[],
  title: string,
  value: string,
  render: string,
  category: string,
  tag: number[],
  describle: string,
  'cover_img': string,
}

export function uploadArticle (data: uploadArticleParams): Promise<AxiosResponse> {
  return http.post('/v1/admin/uploadArticle', data)
}

export function updateArticle (data: uploadArticleParams): Promise<AxiosResponse> {
  return http.post('/v1/admin/updateArticle', data)
}

interface addCategoryParams {
  name: string
}

export function addCategory (data: addCategoryParams): Promise<AxiosResponse> {
  return http.post('/v1/admin/addCategory', data)
}

interface editCategoryParams {
  id: number,
  name: string
}

export function editCategory (data: editCategoryParams): Promise<AxiosResponse> {
  return http.post('/v1/admin/editCategory', data)
}

interface deleCategoryParams {
  id: number
}

export function deleCategory (data: deleCategoryParams): Promise<AxiosResponse> {
  return http.post('/v1/admin/deleteCategory', data)
}

interface addTagParams {
  name: string
}

export function addTag (data: addTagParams): Promise<AxiosResponse> {
  return http.post('/v1/admin/addTag', data)
}

interface editTagParams {
  id: number,
  name: string
}

export function editTag (data: editTagParams): Promise<AxiosResponse> {
  return http.post('/v1/admin/editTag', data)
}

interface deleTagParams {
  id: number
}

export function deleTag (data: deleTagParams): Promise<AxiosResponse> {
  return http.post('/v1/admin/deleteTag', data)
}
