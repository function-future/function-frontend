<template>
  <div class="auto-overflow-container">
    <div class="columns">
      <div class="column is-6 is-full-touch">
        <div class="batch-form__container">
          <div class="batch-form__container-input">
            <b-field label="Batch Code" label-position="on-border">
              <b-input autofocus
                       v-model="batch.code"
                       name="code"
                       @focus="hideBottomNavBar"
                       @blur="showBottomNavBar"
                       v-validate.continues="'required|alpha_num'">
              </b-input>
            </b-field>
            <div v-if="errors.has('code')"><span class="input-invalid-message">{{ errors.first('code') }}</span></div>
          </div>
          <div class="batch-form__container-input">
            <b-field label="Batch Name" label-position="on-border">
              <b-input autofocus
                       v-model="batch.name"
                       name="name"
                       @focus="hideBottomNavBar"
                       @blur="showBottomNavBar"
                       v-validate.continues="'required'">
              </b-input>
            </b-field>
            <div v-if="errors.has('name')"><span class="input-invalid-message">{{ errors.first('name') }}</span></div>
          </div>
          <div class="batch-form__container-actions">
            <div class="buttons">
              <b-button type="is-light" @click="cancel">Cancel</b-button>
              <b-button type="is-primary" @click="save" :loading="isSubmitting">Save</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/batch-form.js"></script>

<style scoped lang="scss">
  @import "@/assets/css/main.scss";

  .batch-form {
    &__container {
      padding: 2rem 1.25rem;
      margin-bottom: 10vh;

      &-input {
        display: flex;
        flex-direction: column;
        margin-bottom: 1.25rem;
      }

      &-actions {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
