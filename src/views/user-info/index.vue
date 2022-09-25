<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button type="primary" :loading="printLoading" v-print="printObj">
        {{ $t('msg.userInfo.print') }}
      </el-button>
    </el-card>
    <el-card>
      <div class="user-info-box" id="userInfoBox">
        <h2 class="title">{{ $t('msg.userInfo.title') }}</h2>
        <!-- 头部信息 -->
        <div class="headers">
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('msg.userInfo.name')">
              {{ detailData.username }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.sex')">
              {{ detailData.gender }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.nation')">
              {{ detailData.nationality }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.mobile')">
              {{ detailData.mobile }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.province')">
              {{ detailData.province }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.date')">
              {{ $filter.dataFilter(detailData.openTime) }}
            </el-descriptions-item>
            <!-- 备注 -->
            <el-descriptions-item :label="$t('msg.userInfo.remark')" :span="2">
              <el-tag
                class="remark"
                size="small"
                v-for="(item, index) in detailData.remark"
                :key="index"
              >
                {{ item }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.address')" :span="2">
              {{ detailData.address }}
            </el-descriptions-item>
          </el-descriptions>
          <!-- 头像渲染 -->
          <el-image
            class="avatar"
            :src="detailData.avatar"
            :preview-src-list="[detailData.avatar]"
          />
        </div>
        <!-- 内容描述 -->
        <div class="body">
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item :label="$t('msg.userInfo.experience')">
              <ul>
                <li v-for="(item, index) in detailData.experience" :key="index">
                  <span>{{ $filter.dataFilter(item.startTime) }}</span>
                  ------
                  <span>{{ $filter.dataFilter(item.endTime) }}</span>
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.major')">
              {{ detailData.major }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.glory')">
              {{ detailData.glory }}
            </el-descriptions-item>
          </el-descriptions>
          <!-- 签名 -->
          <div class="foot">
            {{ $t('msg.userInfo.foot') }}
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { userDetail } from '@/api/user-manage'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref, watch } from 'vue'

const route = useRoute()
const store = useStore()

const detailData = ref({}) // 表格数据
const printLoading = ref(false) // 打印状态

// 创建打印对象
const printObj = {
  id: 'userInfoBox', // 指定打印区域
  popTitle: 'imooc-vue-element-admin', // 打印标题
  // 打印前
  beforeOpenCallback() {
    printLoading.value = true
  },
  // 打印后
  openCallBack() {
    printLoading.value = false
  }
}

// 获取表格数据
const getUserData = async () => {
  const res = await userDetail(route.params.id)
  detailData.value = res
}

// 监听语言变化，重新获取用户详情信息
watch(
  () => store.getters.language,
  async () => {
    await getUserData()
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.user-info-container {
  .print-box {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  .user-info-box {
    width: 1024px;
    margin: 0 auto;

    .title {
      text-align: center;
      margin-bottom: 20px;
    }

    .headers {
      display: flex;

      :deep(.el-descriptions) {
        flex-grow: 1; // 分配容器剩余空间
      }

      .avatar {
        box-sizing: border-box;
        width: 180px;
        padding: 30px 20px;
        border: 1px solid #ebeef5;
        border-left: none;
      }

      .remark {
        margin-right: 12px;
      }
    }

    .body {
      ul {
        li {
          list-style: none;

          span {
            &:nth-of-type(n + 2) {
              margin-right: 60px;
            }
          }
        }
      }
    }

    .foot {
      margin-top: 40px;
      text-align: right;
    }
  }
}
</style>
