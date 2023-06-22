<template>
  <div :class="['menu-item-container', 'article-container', store.theme]">
    <transition appear name="left-content" enter-active-class="left-content-enter">
      <div class="left-content">
        <div class="article-list border">
          <div class="header">
            <div class="header-left">
              <el-icon class="mr5">
                <Notebook />
              </el-icon>
              <span>文章列表</span>
            </div>
            <div class="header-right">
              <div>共</div>
              <div class="article-number">
                {{ articlesCount }}
              </div>
              <div>篇</div>
            </div>
          </div>
          <div class="body">
            <Article v-for="(item, index) in articleList" :key="index" :img="item.img" :title="item.title"
              :introduction="item.introduction" :avatar="item.User.avatar" :name="item.User.name"
              :time="item.createdAt.substring(0, 10)" :tag="item.Categories" :like="item.like" :comment="item.comment"
              :look="item.look"></Article>
          </div>
          <div class="footer">
            <el-pagination :page-size="3" :pager-count="11" layout="prev, pager, next" :total="articlesCount"
              @current-change="changePage" />
          </div>
        </div>
      </div>
    </transition>
    <transition appear name="right-content" enter-active-class="right-content-enter">
      <div class="right-content">
        <div class="catalogue-list border">
          <div class="header">
            <div class="header-left">
              <el-icon class="mr5">
                <More />
              </el-icon>
              <span>分类</span>
            </div>
            <div class="header-right">more</div>
          </div>
          <div class="body">
            <el-tag class="catalogue-tag ml5" size="large" effect="dark" v-for="(tag, index) in tags" :key="index"
              :type="tagType[index % 5]">{{ tag.name }}</el-tag>
          </div>
        </div>
        <div class="recent-article-list border">
          <div class="header">
            <div class="header-left">
              <el-icon class="mr5">
                <Clock />
              </el-icon>
              <span>最近文章</span>
            </div>
            <div class="header-right">more</div>
          </div>
          <div class="body">
            <RecentArticle v-for="article in recentArticles" :time="article.createdAt" :id="article.id" :key="article.id"
              :title="article.title"></RecentArticle>
          </div>
        </div>
        <div class="make-friend-content border">
          <div class="header">
            <div class="header-left">
              <el-icon class="mr5">
                <UserFilled />
              </el-icon>
              <span>联系方式</span>
            </div>
            <div class="header-right">more</div>
          </div>
          <div class="body"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import articleTags from '@/config/articleTags'
import _tagType from '@/config/tagType'
import { ElMessage } from 'element-plus'
import { getAllArticleNumber, getArticleList, getRecentArticle } from '@/axios/service/article'
import Article from '@/components/article.vue'
import RecentArticle from '@/components/recentArticle.vue'
const store = useThemeStore()
const articlesCount = ref(0)
const articleList = ref([])
const recentArticles = ref([])
const tags = computed(() => articleTags)
const tagType = computed(() => _tagType)
onMounted(async () => {
  try {
    const {
      data: { data: _articlesCount }
    } = await getAllArticleNumber()
    articlesCount.value = _articlesCount
    const {
      data: { data: _articleList }
    } = await getArticleList(1, 3)
    articleList.value = _articleList
    const {
      data: { data: _recentArticles }
    } = await getRecentArticle()
    console.log(_recentArticles)
    recentArticles.value = _recentArticles
  } catch (e) {
    console.log(e)
    ElMessage({
      type: 'error',
      message: '获取数据失败,请重试'
    })
  }
})
const changePage = async () => { }
</script>

<style lang="less" scoped>
.article-container {
  padding: 50px 12% 100px 12%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;

  .header {
    height: 40px;
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: #8fb7bc;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;

    &-left {
      height: 100%;
      font-size: 13px;
      display: flex;
      align-items: center;
    }

    &-right {
      width: auto;
      height: 100%;
      font-size: 13px;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      color: var(--color);
    }
  }

  .left-content {
    margin-right: 1%;
    width: min-content;

    .article-list {
      width: 50vw;
      height: 900px;
      background-color: var(--background-color);

      .header {
        &-right {
          .article-number {
            color: #ffd04b;
            font-size: 20px;
            margin-left: 12px;
            margin-right: 12px;
          }
        }
      }

      .body {
        position: relative;
        height: 760px;
      }

      .footer {
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        outline: none;
      }
    }
  }

  .right-content {
    width: min-content;

    .header-right {
      color: #818ad4;
      cursor: pointer;
    }

    .catalogue-list {
      width: 22vw;
      height: 160px;
      background-color: var(--background-color);
      margin-bottom: 10px;

      .header {}

      .body {
        padding: 0 10px;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-content: space-around;
        height: 120px;

        .catalogue-tag {
          cursor: pointer;
        }

        .catalogue-tag:hover {
          transform: scale(1.1);
        }
      }
    }

    .recent-article-list {
      width: 22vw;
      height: 260px;
      background-color: var(--background-color);
      margin-bottom: 10px;
    }

    .make-friend-content {
      width: 22vw;
      height: 260px;
      background-color: var(--background-color);
      margin-bottom: 10px;
    }
  }

  .border {
    border-style: solid;
    border-width: 2px;
    border-radius: 5px;
    border-color: #e3e1e3;
    box-shadow: 2px 2px 2px #e3e1e3;
  }
}

.left-content-enter {
  animation-name: leftContent;
  animation-duration: 2s;
}

.right-content-enter {
  animation-name: rightContent;
  animation-duration: 2s;
}

@keyframes leftContent {
  from {
    opacity: 0;
    transform: translateY(100px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes rightContent {
  from {
    opacity: 0;
    transform: translateX(100px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
