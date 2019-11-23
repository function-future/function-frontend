<template>
  <div class="auto-overflow-container">
    <div class="question-form__container">
      <div class="question-form__container-description">
        <input type="hidden"
               v-model="questionDetail.label"
               name="description"
               v-validate.disable="'required'" />
        <Editor label="Question"
                v-model="questionDetail.label"
                ref="editor"
                placeholder="Insert description here">
        </Editor>
        <div v-if="errors.has('description')"><span class="input-invalid-message">{{ errors.first('description') }}</span></div>
      </div>
      <div class="question-form__container-answer-info">
        <section>
          <b-message title="Info with icon" type="is-info" has-icon aria-close-label="Close message" size="is-small">
            Select the correct answer by clicking on the radio button
          </b-message>
        </section>
      </div>
      <div class="question-form__container-options">
        <div class="question-form__container-options-detail">
          <b-field v-for="index in 4" :key="index" :label="optionLabel(index)"
                   label-position="on-border"
                   :type="{'is-success': index===correctAnswer}">
            <b-radio v-model="correctAnswer"
                     :native-value="index"
                     type="is-success"
                     class="question-form__container-options-detail-radio">
            </b-radio>
            <b-input v-model="questionDetail.options[index-1].label"
                     size="is-medium"
                     class="question-form__container-options-detail-field"></b-input>
          </b-field>
        </div>
      </div>
      <div class="question-form__container-actions">
        <div class="buttons">
          <b-button type="is-light" @click="cancel">Cancel</b-button>
          <b-button type="is-primary" @click="saveQuestion">Save</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/question-form.js"></script>

<style scoped lang="scss">
  @import "@/assets/css/main.scss";

  .question-form {
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

      &-answer-info {
        margin-bottom: 1rem;
      }

      &-options {
        display: flex;
        justify-content: space-between;
        width: 100%;

        &-detail {
          width: 100%;

          &-field {
            width: 100%;
          }
        }
      }

    &-actions {
      margin-top: 1rem;
       display: flex;
       justify-content: flex-end;
     }
    }
  }
</style>
