<template>
  <div class="scrollable-container">
    <BaseInput v-model="questionBankDetail.title" :placeholder="'Insert title'" :disabled="!editMode"></BaseInput>
    <BaseTextArea v-model="questionBankDetail.description" :style="{height: '530px'}" placeholder="Description goes here" :disabled="!editMode"></BaseTextArea>
    <div class="scrollable-container__footer">
      <BaseButton type="cancel" buttonClass="button-cancel" @click="cancelButtonClicked">{{cancelButtonText}}</BaseButton>
      <BaseButton type="submit" buttonClass="button-save" @click="actionButtonClicked">{{actionButtonText}}</BaseButton>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/question-bank-detail.js">
</script>

<style lang="scss" scoped>
  .scrollable-container {
    margin: 10px;
    padding: 0 15px;
    &__footer {
      margin-top: 30px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
</style>
