<template>
  <div class="auto-overflow-container">
    <div class="question-bank__container">
      <div class="question-bank__container__actions">
        <b-button rounded
                  icon-left="pen"
                  type="is-primary"
                  @click="redirectToEditQuestionBankForm"
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
      <div class="question-bank__container__header">
        <div class="question-bank__container__header-title">
          <span class="is-size-5 has-text-weight-bold">
            {{ questionBankDetail.title }}
          </span>
        </div>
      </div>
      <div class="question-bank__container__content wrap-word">
        <span v-html="questionBankDetail.description"></span>
      </div>
      <div class="question-bank__container__questions-list" v-if="!!questionBankDetail">
        <template>
          <section>
            <b-collapse class="card" aria-id="contentIdForA11y3">
              <div
                slot="trigger"
                slot-scope="props"
                class="card-header"
                role="button"
                aria-controls="contentIdForA11y3">
                <p class="card-header-title">
                  Questions
                </p>
                <a class="card-header-icon">
                  <b-icon
                    :icon="props.open ? 'chevron-down' : 'chevron-up'">
                  </b-icon>
                </a>
              </div>
              <div class="card-content overflow-container">
                <div class="content">
                  <div v-for="question in questions" :key="question.id">
                    <ListItem @click="redirectToQuestionDetail(question.id)">
                      <template #title>
                        {{ question.label }}
                      </template>
                      <template #actions>
                        <b-dropdown aria-role="list"
                                    position="is-bottom-left"
                                    @click.prevent.stop>
                          <button class="button is-text" slot="trigger">
                            <b-icon icon="ellipsis-v" size="is-small" class="icon"></b-icon>
                          </button>
                          <b-dropdown-item
                            aria-role="listitem"
                            @click="redirectToEditQuestionForm(question.id)">
                              <span class="icon-wrapper">
                                <b-icon icon="edit" class="icon" size="is-small"></b-icon>
                                Edit
                              </span>
                          </b-dropdown-item>
                          <b-dropdown-item
                            aria-role="listitem"
                            @click="openDeleteConfirmationModal(question.id)">
                              <span class="icon-wrapper">
                                <b-icon icon="trash-alt" class="icon" size="is-small"></b-icon>
                                Delete
                              </span>
                          </b-dropdown-item>
                          <b-dropdown-item
                            aria-role="listitem"
                            class="is-hidden-desktop">
                            <b-button type="is-light" expanded>Cancel</b-button>
                          </b-dropdown-item>
                        </b-dropdown>
                      </template>
                    </ListItem>
                  </div>
                </div>
                <infinite-loading @infinite="getQuestionList" :identifier="infiniteId"
                                  spinner="spiral">
                  <div slot="no-more"></div>
                  <div slot="no-results"></div>
                </infinite-loading>
              </div>
              <div class="buttons is-right judging-form__container-students-add">
                <b-button type="is-primary" @click="redirectToQuestionForm">Add Question</b-button>
              </div>
            </b-collapse>
          </section>
        </template>
      </div>
    </div>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="showDeleteConfirmationModal = false"
                               @clickDelete="deleteItem">
      <div slot="description">{{deleteModalMessage}}</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/question-bank-detail.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .question-bank {
    &__container {
      display: flex;
      flex-direction: column;
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

  .overflow-container {
    max-height: 45vh;
    overflow-y: auto;
  }

  /deep/ img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-height: 300px;
  }
</style>
