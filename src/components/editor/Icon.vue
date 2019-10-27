<template>
  <div class="icon" :class="[`icon--${name}`, `icon--${size}`, { 'has-align-fix': fixAlign }]">
    <b-icon :icon="name" size="is-small" />
  </div>
</template>

<script>
  export default {
    props: {
      name: {},
      size: {
        default: 'normal',
      },
      modifier: {
        default: null,
      },
      fixAlign: {
        default: true,
      },
    },
  }
</script>

<style lang="scss" scoped>
  .icon {
    display: flex;
    align-items: center;
    width: 0.8rem;
    height: 0.8rem;
    margin: 0;
    fill: currentColor;

    &__svg {
      display: inline-block;
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  // svg sprite
  body > svg,
  .icon use > svg,
  symbol {
    path,
    rect,
    circle,
    g {
      fill: currentColor;
      stroke: none;
    }
    *[d="M0 0h24v24H0z"] {
      display: none;
    }
  }
</style>
