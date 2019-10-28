<template>
  <span :style="{ height, width: computedWidth }" class="SkeletonBox">
  </span>
</template>

<script src="./js/skeleton-box.js"></script>

<style lang="scss" scoped>
  .SkeletonBox {
    display: inline-block;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    background-color: #DDDBDD;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(
          90deg,
          rgba(#fff, 0) 0,
          rgba(#fff, 0.2) 20%,
          rgba(#fff, 0.5) 60%,
          rgba(#fff, 0)
      );
      animation: shimmer 5s infinite;
      content: '';
    }

    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }
  }
</style>
