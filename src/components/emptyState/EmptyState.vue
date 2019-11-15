<template>
  <div class="empty-state__container">
    <img
      class="empty-state__container-asset"
      :src="source"
      alt="alt"
    >
    <div class="empty-state__container__text-container">
      <span class="empty-state__container__text">
        <slot name="message"></slot>
      </span>
    </div>
  </div>
</template>

<script src="./js/empty-state.js"></script>

<style lang="scss" scoped>
  .empty-state {
    &__container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &-asset {
        padding: 4rem 1rem 1rem 1rem;
        width: 300px;

        @media only screen and (max-width: 1023px) {
          width: 200px;
        }

        &__text {
          color: #7f7f7f;

          &-container {
            padding: 0.5rem;
          }
        }
      }
    }
  }
</style>
