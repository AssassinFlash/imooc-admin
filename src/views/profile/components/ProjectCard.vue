<template>
  <el-card class="user-container">
    <template #header>
      <div class="header">
        <span>{{ $t('msg.profile.introduce') }}</span>
      </div>
    </template>
    <div class="user-profile">
      <!-- 头像 -->
      <div class="box-center">
        <pan-thumb
          :image="$store.getters.userInfo.avatar"
          width="100px"
          height="100px"
        >
          <div>Hello</div>
          {{ $store.getters.userInfo.title }}
        </pan-thumb>
      </div>
      <!-- 姓名 && 角色 -->
      <div class="box-center">
        <div class="user-name text-center">
          {{ $store.getters.userInfo.username }}
        </div>
        <div class="user-role text-center text-muted">
          {{ $store.getters.userInfo.title }}
        </div>
      </div>
      <!-- 项目简介 -->
      <div class="project-bio">
        <div class="project-bio-header">
          <span><svg-icon icon="introduce"></svg-icon></span>
          <span>{{ $t('msg.profile.projectIntroduction') }}</span>
        </div>
        <div class="project-bio-body">
          <div class="text-muted">{{ $t('msg.profile.muted') }}</div>
        </div>
      </div>
      <!-- 项目功能介绍 -->
      <div class="project-function">
        <div class="project-function-header">
          <span>
            <svg-icon icon="reward"/>
            {{ $t('msg.profile.projectFunction') }}
          </span>
        </div>
        <div class="project-function-body">
          <div
            class="progress-item"
            v-for="item in features"
            :key="item.id"
          >
            <div>{{ item.title }}</div>
            <el-progress :percentage="item.percentage" status="success"/>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import PanThumb from '@/components/PanThumb'
import SvgIcon from '@/components/SvgIcons'

defineProps({
  features: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.user-container {
  .text-muted {
    font-size: 14px;
    color: #777;
  }

  .user-profile {
    text-align: center;

    .user-name {
      font-weight: bold;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
    }
  }

  .box-center {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .project-bio {
    padding-top: 20px;
    margin-bottom: 36px;
    text-align: left;
    color: #606266;

    .project-bio-header {
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
      border-bottom: 1px solid #dfe6ec;

      span {
        padding-left: 4px;
      }
    }

    .project-bio-body {

      div {
        font-size: 14px;
        margin-bottom: 2px;
      }
    }
  }

  .project-function {
    padding-bottom: 20px;
    text-align: left;
    color: #606266;

    .project-function-header {
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #dfe6ec;

      span {
        font-weight: bold;
        padding-left: 4px;
      }
    }

    .project-function-body {
      div {
        font-size: 14px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
