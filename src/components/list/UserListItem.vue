<template>
  <div class="list-wrapper">
    <div class="list-container">
      <div class="list-container__content" v-on="$listeners" v-bind="$attrs">
        <div class="list-container__content-picture">
          <figure class="image is-64x64 is-horizontal-center">
            <img class="is-rounded" v-if="!imageUrl"
                 :src="require('@/assets/profile-picture-placeholder.png')">
            <img class="is-rounded" v-else :src="imageUrl">
          </figure>
        </div>
        <div class="list-container__content-wrapper">
          <div class="list-container__content-content">
            <div class="list-container__content-content-title has-text-weight-bold">
              <SkeletonBox v-if="loading" height="1.25rem" :min-width="40" :max-width="70"></SkeletonBox>
              <slot v-else name="name"></slot>
            </div>
            <div class="list-container__content-content-info">
              <SkeletonBox class="skeleton" v-if="loading" :min-width="15" :max-width="25"></SkeletonBox>
              <SkeletonBox class="skeleton" v-if="loading" :min-width="25" :max-width="35"></SkeletonBox>
              <slot v-else name="info"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="list-container__actions">
        <slot v-if="!loading" name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script src="./js/user-list-item.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .list {
    &-wrapper {
      padding: 0.75rem 1rem;
      min-height: 100px;

      @media only screen and (max-width: 1023px) {
        border-bottom: #E7E7E7 1px solid;
        border-left: none;
      }
    }

    &-container {
      display: flex;
      justify-content: space-between;

      &__content {
        display: flex;
        align-items: center;
        width: 100%;

        &-wrapper {
          width: 100%;
        }

        &-picture {
          margin-right: 1.5rem;
        }

        &-content {
          margin-bottom: 0.25rem;

          &-title {
            max-width: 55vw;
            margin-bottom: 0.25rem;

            @media only screen and (max-width: 1023px) {
              max-width: 65vw;
            }
          }

          &-info {
            display: flex;
            flex-direction: column;
            border-left: 1px solid #BDBDBD;
            padding-left: 0.5rem;
            font-size: 0.75rem;
          }
        }
      }
    }

    &__actions {
      margin-left: 0.5rem;
    }
  }

  .skeleton {
    margin: 0.25rem 0;
  }

  .is-horizontal-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
