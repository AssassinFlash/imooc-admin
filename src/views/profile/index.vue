<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <ProjectCard class="user-card" :features="featureData"/>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane
              :label="$t('msg.profile.feature')"
              name="feature"
            >
              <Feature :features="featureData"/>
            </el-tab-pane>
            <el-tab-pane
              :label="$t('msg.profile.chapter')"
              name="chapter"
            >
              <Chapter/>
            </el-tab-pane>
            <el-tab-pane
              :label="$t('msg.profile.author')"
              name="author"
            >
              <Author/>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { feature } from '@/api/user'
import ProjectCard from './components/ProjectCard.vue'
import Feature from '@/views/profile/components/Feature'
import Chapter from '@/views/profile/components/Chapter'
import Author from '@/views/profile/components/Author'

const store = useStore()

// tab栏切换
const activeName = ref('feature')

// project需要的功能介绍数据
const featureData = ref([])
const getFeatureData = async () => {
  featureData.value = await feature()
}

// 监听语言切换，让接口直接返回国际化数据
watch(() => store.getters.language, () => {
  getFeatureData()
}, { immediate: true })
</script>

<style lang="scss" scoped>
.user-card {
  margin-right: 20px;
}
</style>
