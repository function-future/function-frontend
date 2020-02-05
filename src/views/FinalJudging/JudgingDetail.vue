<template>
  <div class="auto-overflow-container">
    <div class="judging_container">
      <div class="judging-session__container">
        <div class="judging-session__action">
          <b-button rounded
                    icon-left="pen"
                    type="is-primary"
                    @click="moveToEditPage"
                    v-if="accessList.edit">
            Edit
          </b-button>
          <b-button rounded
                    icon-left="trash"
                    type="is-danger"
                    @click="showDeleteConfirmationModal = true"
                    v-if="accessList.delete">
            Delete
          </b-button>
        </div>
        <div class="judging-session__detail">
          <div class="judging-session__detail-header">
          <span class="is-size-5 has-text-weight-bold">
            {{judging.name}}
          </span>
          </div>
          <div class="judging-session__detail-batch">
          <span class="is-size-7">
            Batch {{judging.batchCode}}
          </span>
          </div>
          <div class="judging-session__detail-description">
          <span v-html="descriptionCompiledMarkdown">
          </span>
          </div>
        </div>
        <div class="judging-session__content level">
          <comparison-item class="level-item judging-session__content-item"
                           v-for="student in judging.students"
                           :key="student.id" :studentData="student">

          </comparison-item>
        </div>
      </div>
      <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                                 @close="showDeleteConfirmationModal = false"
                                 @clickDelete="deleteThisJudging">
        <div slot="description">Are you sure you want to delete this judging session?</div>
      </modal-delete-confirmation>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/judging-detail.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .judging_container {
    @media only screen and (max-width: 1023px) {
      margin-bottom: 10vh;
    }
  }

  .judging-session {
    &__container {
      padding: 1rem 1.25rem;
    }

    &__action {
      margin-bottom: 0.75rem;
      z-index: 5;

      button {
        margin-left: 0.25rem;
        margin-right: 0.25rem;

        &:first-child {
          margin-left: 0;
        }
      }

      @media only screen and (max-width: 1023px) {
        margin-bottom: 0;
        display: flex;
        flex-direction: column;
        position: fixed;
        right: 5vw;
        bottom: 75px;
        transition: all 0.1s ease-in-out;
        border-radius: 50%;

        button {
          margin: 0.25rem 0;
          box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.1);
        }
      }
    }

    &__detail {
      &-header {
        margin-bottom: 0;
      }
      &-batch {
        margin-bottom: 0.75rem;
      }

      &-description {
        border-bottom: 1px solid #BDBDBD;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
      }
    }

    &__content {
      max-width: 100%;

      &-item {
        @media only screen and (min-width: 1023px) {
          max-width: 48%;
        }
      }
    }
  }
</style>
