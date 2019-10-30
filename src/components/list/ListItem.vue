<template>
  <div class="list-wrapper">
    <div class="list-container">
      <div class="list-container__content" v-on="$listeners" v-bind="$attrs">
        <div class="list-container__content-header">
          <div class="list-container__content-header-title has-text-weight-bold">
            <slot name="title"></slot>
          </div>
          <div class="list-container__content-header-info">
            <slot name="info"></slot>
          </div>
        </div>
        <div class="list-container__content-content">
          <slot name="content"></slot>
        </div>
      </div>
      <div class="list-container__actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script src="./js/list-item.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .list {
    &-wrapper {
      padding: 0.75rem 1rem;
      min-height: 100px;
      cursor: pointer;
      border-bottom: #E7E7E7 1px solid;
    }

    &-container {
      display: flex;
      justify-content: space-between;

      &__content {
        width: 100%;

        &-header {
          margin-bottom: 0.25rem;

          &-title {
            max-width: 55vw;

            @media only screen and (max-width: 1023px) {
              max-width: 65vw;
            }
          }

          &-info {
            border-left: 1px solid #BDBDBD;
            padding-left: 0.5rem;
            font-size: 0.75rem;
          }
        }

        &__content {
          max-height: 150px;
        }
      }
    }

    &__actions {
      margin-left: 0.5rem;
    }
  }
</style>
