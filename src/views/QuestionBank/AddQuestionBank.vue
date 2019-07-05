<template>
  <div class="main-container">
    <BaseInput v-model="questionBankDetail.title" :placeholder="'Insert title'"></BaseInput>
    <BaseTextArea v-model="questionBankDetail.description" :style="{height: '530px'}" placeholder="Description goes here"></BaseTextArea>
    <div class="main-container__footer">
      <BaseButton type="cancel" buttonClass="button-cancel" @click="cancelButtonClicked">Cancel</BaseButton>
      <BaseButton type="submit" buttonClass="button-save" @click="saveButtonClicked">Save</BaseButton>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/add-question-bank.js">
</script>

<style lang="scss" scoped>
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px;
    &__footer {
      margin-top: 30px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
</style>
