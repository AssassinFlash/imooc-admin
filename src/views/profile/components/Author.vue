<template>
  <div class="author">
    <div class="author-wrapper">
      <PanThumb
        image="https://img4.sycdn.imooc.com/61110c2b0001152907400741-140-140.jpg"
        width="60px"
        height="60px"
      >
        {{ $t('msg.profile.name') }}
      </PanThumb>
      <div class="right-desc">
        <h4>{{ $t('msg.profile.name') }}</h4>
        <p>一个前端开发程序员</p>
      </div>
    </div>
    <div class="author-desc">
      {{ $t('msg.profile.Introduction') }}
    </div>
  </div>
</template>

<script setup>
import PanThumb from '@/components/PanThumb'
</script>

<style lang="scss" scoped>
.author {
  .author-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .right-desc {
      margin-left: 10px;

      p {
        padding-top: 10px;
        font-size: 14px;
        color: #666;
      }
    }
  }

  .author-desc {
    text-indent: 2em;
  }
}
</style>
