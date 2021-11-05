<template>
  <view class="prefer-content">
    <!-- 标题 -->
    <view class="prefer-title">为你优选</view>
    <scroll-view scroll-x="true" class="scroll" scroll-with-animation="true">
      <view class="prefer-dis">
        <view
          class="prefer-view"
          v-for="(item, index) in preferData"
          :key="index"
        >
          <image :src="item.image" mode="aspectFill" />
          <text>{{ item.title }}</text>
          <text>{{ item.lable }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  props: {
    preferData: Array,
  },
};
</script>

<style lang="scss" scoped>
.prefer-content {
  margin: 30rpx 0;
  padding: 0 20rpx;

  .prefer-title {
    height: 50rpx;
    line-height: 50rpx;
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }

  .scroll {
    width: 100%;
    height: 300rpx;
    white-space: nowrap; // 必须加上这个才有滚动效果

    .prefer-dis {
      display: flex;
      justify-content: space-between;

      .prefer-view {
        width: 300rpx;
        height: 300rpx;
        margin: 0 10rpx;

        &:first-of-type {
          margin-left: 0;
        }

        image {
          width: 300rpx;
          height: 200rpx;
          border-radius: 10rpx;
        }

        text {
          height: 45rpx;
          line-height: 45rpx;
					padding-left: 10rpx;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;

          &:nth-child(2) {
            font-size: 30rpx;
          }

          &:nth-child(3) {
            font-size: 27rpx;
            color: #9c9c9c;
          }
        }
      }
    }
  }
}
</style>
