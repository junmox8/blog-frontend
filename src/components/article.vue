<template>
  <div class="artist-container">
    <div class="artist-container-img">
      <el-image :src="img" fit="cover" lazy />
    </div>
    <div class="artist-container-main">
      <div class="main-title">
        <el-icon class="mr5">
          <Paperclip />
        </el-icon>
        <span class="title">{{ title }}</span>
      </div>
      <div class="main-introduction">
        {{ introduction }}
      </div>
      <div class="main-info">
        <div class="info__author">
          <img class="avatar" :src="avatar" />
          <div class="name">{{ name }}</div>
        </div>
        <div class="info__time">
          <div class="time">
            <el-icon>
              <Clock />
            </el-icon>
            <span class="ml5">{{ time }}</span>
          </div>
        </div>
        <div class="info__article">
          <div class="stars">
            <el-icon>
              <Star />
            </el-icon>
            <span class="ml5">{{ like }}</span>
          </div>
          <div class="comment-count">
            <el-icon>
              <ChatDotSquare />
            </el-icon>
            <span class="ml5">{{ comment }}</span>
          </div>
          <div class="views">
            <el-icon>
              <View />
            </el-icon>
            <span class="ml5">{{ look }}</span>
          </div>
        </div>
      </div>
      <div class="main-tag">
        <el-tag class="ml5" v-for="(item, index) in tag" :key="index" :type="tagType[index % 5]">{{
          item.name
        }}</el-tag>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import _tagType from '@/config/tagType'
defineProps({
  img: {
    type: String
  },
  title: {
    type: String
  },
  introduction: {
    type: String
  },
  avatar: {
    type: String
  },
  name: {
    type: String
  },
  time: {
    type: String
  },
  tag: {
    type: Array
  },
  like: {
    type: Number
  },
  comment: {
    type: Number
  },
  look: {
    type: Number
  }
})
const tagType = computed(() => _tagType)
</script>

<style scoped lang="less">
.artist-container {
  width: 100%;
  height: 240px;
  padding: 8px;
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 1px solid #edeced;

  &-img {
    width: 30%;
    height: 232px;
    .el-image {
      width: 100%;
      height: 100%;
    }
  }

  &-main {
    width: 65%;
    height: 100%;
    margin-left: 5%;
    cursor: pointer;
    transition: all 1s;

    .main-title {
      width: 90%;
      margin-top: 20px;
      display: flex;
      align-items: center;
      font-size: 16px;
      color: var(--color);
      .title {
        max-width: 95%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .main-introduction {
      overflow: hidden;
      height: 56px;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      width: 90%;
      margin-top: 10px;
      font-size: 14px;
      color: #474547;
    }

    .main-info {
      margin-top: 20px;
      width: 90%;
      height: 30px;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;

      .info__author {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;

        .avatar {
          height: 30px;
          width: 30px;
          border-radius: 50%;
        }

        .name {
          align-self: flex-end;
          margin-left: 5px;
          font-size: 13px;
          color: #0392dc;
        }
      }

      .info__time {
        margin-left: 30px;
        height: 100%;
        display: flex;

        .time {
          align-self: flex-end;
          font-size: 12px;
        }
      }

      .info__article {
        height: 100%;
        display: flex;
        flex-wrap: nowrap;
        margin-left: 30px;

        .stars,
        .comment-count,
        .views {
          margin-right: 10px;
          align-self: flex-end;
          font-size: 12px;
        }
      }
    }

    .main-tag {
      width: 90%;
      margin-top: 15px;
      height: 30px;
    }
  }

  &-main:hover {
    transform: translateZ(-20px) scale(0.9);
  }
}
</style>
