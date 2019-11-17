<template>
  <div class="auto-overflow-container">
    <div class="question__container">
      <div class="question__container__actions">
        <b-button rounded
                  icon-left="pen"
                  type="is-primary"
                  @click=""
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
      <div class="question__container__detail">
        <div class="question__container__header">
          <div class="question__container__header-title has-text-centered">
            <div class="tile is-ancestor">
              <div class="tile is-parent">
                <article class="tile is-child box">
                  <span class="is-size-5 has-text-weight-bold">
                    {{ questionDetail.label }}
                  </span>
                </article>
              </div>
            </div>

          </div>
        </div>
        <div class="question__container__options">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child box" :class="{'notification is-info': questionDetail.options[0].correct}">
                <div class="tile-header">
                  <p v-text="header(0)"></p>
                </div>
                <p class="subtitle">{{questionDetail.options[0].label}}</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box" :class="{'notification is-info': questionDetail.options[1].correct}">
                <div class="tile-header">
                  <p v-text="header(1)"></p>
                </div>
                <p class="subtitle">{{questionDetail.options[1].label}}</p>
              </article>
            </div>
          </div>
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child box" :class="{'notification is-info': questionDetail.options[2].correct}">
                <div class="tile-header">
                  <p v-text="header(2)"></p>
                </div>
                <p class="subtitle">{{questionDetail.options[2].label}}</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box" :class="{'notification is-info': questionDetail.options[3].correct}">
                <div class="tile-header">
                  <p v-text="header(3)"></p>
                </div>
                <p class="subtitle">{{questionDetail.options[3].label}}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="showDeleteConfirmationModal = false"
                               @clickDelete="deleteQuestion">
      <div slot="description">Are you sure you want to delete this question?</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/question-bank-question-detail.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .question {
    &__container {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 1rem 1.25rem;

      &__actions {
        margin-bottom: 0.75rem;

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

      &__header {
        margin-bottom: 0.75rem;

        &__info {
          border-left: 1px solid #BDBDBD;
          padding-left: 0.5rem;
        }
      }

      &__detail {
        margin: auto 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      &__options {
        width: 100%;
      }

      &__content {
        padding-bottom: 1rem;
        border-bottom: 1px solid #BDBDBD;
        margin-bottom: 1rem;
        @media only screen and (max-width: 1023px) {
          margin-bottom: 15vh;
        }
      }
    }
  }

  .tile-header {
    width: 100%;
    border-bottom: 1px solid #BDBDBD;
    margin-bottom: 1rem;
  }

  /deep/ img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-height: 300px;
  }
</style>

