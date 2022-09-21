<template>
  <div
    class="pan-thumb"
    :style="{zIndex: zIndex, width: width, height: height}"
  >
    <div class="pan-info">
      <div class="pan-info-container">
        <slot/>
      </div>
    </div>
    <div class="pan-avatar" :style="{backgroundImage: `url(${image})`}"></div>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true
  },
  width: {
    type: String,
    default: '150px'
  },
  height: {
    type: String,
    default: '150px'
  },
  zIndex: {
    type: Number,
    default: 1
  }
})
</script>
<script>
export default {
  name: 'PanThumb'
}
</script>

<style lang="scss" scoped>
.pan-thumb {
  position: relative;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  .pan-info {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    overflow: hidden;

    .pan-info-container {
      padding: 20px;
      text-align: center;
      font-size: 14px;
      white-space: nowrap;
    }
  }

  .pan-avatar {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    background-position: center center;
    background-size: cover;
    overflow: hidden;
    transform-origin: 95% 20%;
    transition: all 0.3s;
  }

  &:hover {
    .pan-avatar {
      transform: rotate(-110deg);
    }
  }
}
</style>
