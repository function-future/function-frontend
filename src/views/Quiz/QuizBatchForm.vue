<template>
  <div class="scrollable-container">
    <div class="edit-container">
      <div class="input">
        <BaseInput autofocus
                   class="input-code"
                   inputType="title"
                   v-model="batch.code"
                   placeholder="Batch Code"
                   v-validate.continues="'required|alpha_num'"
                   name="code"></BaseInput>
      </div>
      <div v-if="errors.has('code')"><span class="input-invalid-message">{{ errors.first('code') }}</span></div>
      <div class="input">
        <BaseInput class="input-name"
                   inputType="title"
                   v-model="batch.name"
                   placeholder="Batch Name"
                   v-validate.continues="'required'"
                   name="name"></BaseInput>
      </div>
      <div v-if="errors.has('name')">
        <span class="input-invalid-message">{{ errors.first('name') }}</span>
      </div>
      <div class="action">
        <div class="action-button">
          <BaseButton type="cancel" buttonClass="button-cancel" @click="cancel">Cancel</BaseButton>
        </div>
        <div class="action-button">
          <BaseButton type="submit" buttonClass="button-save" @click="sendBatch">Save</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/quiz-batch-form.js"></script>

<style scoped lang="scss">
  .edit-container {
    margin: 30px 10px;
    text-align: left;
    width: 50%;
  }

  .input-title {
    margin-right: 10px;
    width: 100%;
    font-size: 1.2em;
  }

  .input-invalid-message {
    color: #FF0000;
    font-size: 0.75em;
    margin-left: 2vw;
  }

  .action {
    display: flex;
    justify-content: flex-end;
    margin: 15px 0;
  }

  .action-button {
    display: inline-block;
    padding-left: 5px;
    padding-right: 5px;
  }

  .icon {
    margin-right: 5px;
  }
</style>
