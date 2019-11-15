<template>
  <div class="empty-state__container">
    <img
      class="empty-state__container-asset"
      :src="source"
      alt="alt"
    >
    <div class="empty-state__container__text-container">
      <span class="empty-state__container__text has-text-weight-bold is-size-5 is-size-6-touch">
        <span v-if="errorState">Oops!</span>
        <slot v-else name="title"></slot>
      </span>
      <span class="empty-state__container__text is-size-7-touch">
        <span v-if="errorState">Looks like something went wrong, please try again later.</span>
        <slot v-else name="message"></slot>
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
      }

      &__text {
        text-align: center;

        &-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0.5rem;
        }
      }
    }
  }
</style>
