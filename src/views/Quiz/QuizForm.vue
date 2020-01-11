<template>
  <div class="auto-overflow-container">
    <div class="quiz-form__container">
      <div class="quiz-form__container-title">
        <b-field label="Title">
          <b-input autofocus
                   placeholder="Insert title here"
                   v-model="quizDetail.title"
                   name="title"
                   v-validate.disable="'required'">
          </b-input>
        </b-field>
        <div v-if="errors.has('title')"><span class="input-invalid-message">{{ errors.first('title') }}</span></div>
      </div>
      <div class="quiz-form__container-description">
        <input type="hidden"
               v-model="quizDetail.description"
               name="description"
               v-validate.disable="'required'" />
        <Editor label="Description"
                v-model="quizDetail.description"
                ref="editor"
                placeholder="Insert description here">
        </Editor>
        <div v-if="errors.has('description')"><span class="input-invalid-message">{{ errors.first('description') }}</span></div>
      </div>
      <div class="quiz-form__container-details">
        <div class="quiz-form__container-details__date">
          <div class="quiz-form__container-details-input">
            <b-field label="Submission Date" label-position="on-border">
              <b-datepicker v-model="calendarDetails.dates"
                            placeholder="Select Dates"
                            :min-date="calendarDetails.minDate"
                            range></b-datepicker>
            </b-field>
          </div>
        </div>
        <div class="quiz-form__container-details__limit">
          <div class="quiz-form__container-details-input">
            <b-field label="Time Limit" label-position="on-border">
              <b-input v-model="quizDetail.timeLimit"
                       type="number"></b-input>
            </b-field>
          </div>
        </div>
        <div class="quiz-form__container-details__limit">
          <div class="quiz-form__container-details-input">
            <b-field label="Trials" label-position="on-border">
              <b-input v-model="quizDetail.trials"
                       type="number"></b-input>
            </b-field>
          </div>
        </div>
        <div class="quiz-form__container-details__limit">
          <div class="quiz-form__container-details-input">
            <b-field label="Question Amount" label-position="on-border">
              <b-input v-model="quizDetail.questionCount"
                       type="number"></b-input>
            </b-field>
          </div>
        </div>
      </div>
      <div class="quiz-form__container-students">
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
                  Question Banks
                </p>
                <a class="card-header-icon">
                  <b-icon
                    :icon="props.open ? 'chevron-down' : 'chevron-up'">
                  </b-icon>
                </a>
              </div>
              <div class="card-content">
                <div class="content">
                  <div v-if="bankNotEmpty">
                    <div v-for="bank in quizDetail.questionBanks" :key="bank.id">
                      <ListItem>
                        <template #title>
                          {{ bank.title }}
                        </template>
                        <template #actions>
                          <div class="card-content-action">
                        <span @click="removeQuestionBank(bank.id)">
                        <b-icon icon="trash-alt" class="icon is-danger" size="is-small"></b-icon>
                        </span>
                          </div>
                        </template>
                      </ListItem>
                    </div>
                  </div>
                  <div v-else>
                    <EmptyState src="question-bank">
                      <template #title>
                        Attach an existing question bank
                      </template>
                      <template #message>
                        You can't make a quiz without them!
                      </template>
                    </EmptyState>
                  </div>
                  <div class="buttons is-right quiz-form__container-students-add">
                    <b-button type="is-primary" @click="toggleQuestionBankSelectModal">Add Question Banks</b-button>
                  </div>
                </div>
              </div>
            </b-collapse>
          </section>
        </template>
      </div>
      <div class="quiz-form__container-actions">
        <div class="buttons">
          <b-button type="is-light" @click="cancel">Cancel</b-button>
          <b-button type="is-primary" @click="validateQuiz" :loading="isSubmitting">Save</b-button>
        </div>
      </div>
    </div>
    <modal-select-question-banks  v-if="showSelectQuestionBankModal"
                                  :currentlySelected="quizDetail.questionBanks"
                                  @close="closeQuestionBankModal"
                                  @selected="setSelectedBanks">
    </modal-select-question-banks>
  </div>
</template>

<script type="text/javascript" src="./js/quiz-form.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";


  .quiz-form {
    &__container {
      padding: 1rem 1.25rem;
      margin-bottom: 2rem;

      &-title {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
      }

      &-description {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
      }

      &-details {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 1rem;

        &__date {
          flex-grow: 1;
          flex-shrink: 0;

          @media only screen and (min-width: 1023px) {
            margin-right: 0.5rem;
          }

          @media only screen and (max-width: 1023px) {
            margin-bottom: 1rem;
          }
        }

        &__limit {
          flex-grow: 1;
          flex-shrink: 0;

          @media only screen and (min-width: 1023px) {
            margin-left: 0.5rem;
          }
        }

        &-input {

        }
      }

      &-students {
        margin-bottom: 1rem;

        &-add {
          margin-top: 1rem;
        }
      }

      &-actions {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  /deep/ figure {
    margin-right: 0!important;
    margin-left: 0!important;
  }

  .card-content {
    @media only screen and (max-width: 1023px) {
      padding: 0;
    }

    &-action {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
</style>
