import createAxios from '../index'
export const getAllArticleNumber = async () => {
  return createAxios({
    url: '/api/article/getAllArticleNumber',
    method: 'get'
  })
}
export const getArticleList = async (page, limit) => {
  return createAxios({
    url: '/api/article/getArticleList?page=' + page + '&limit=' + limit,
    method: 'get',
    isLoading: false
  })
}
export const getRecentArticle = async () => {
  return createAxios({
    url: '/api/article/getRecentArticle',
    method: 'get'
  })
}
export const handUpArticle = async (form) => {
  return createAxios({
    url: '/api/article/handUpArticle',
    method: 'post',
    data: {
      ...form,
      img: form.coverImg
    }
  })
}
