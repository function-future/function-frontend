<template>
  <div class="judging-detail__container">
    <div class="judging-detail__container-header">
      <!--Header-->
      <BaseInput placeholder="Input title here"></BaseInput>
    </div>
    <div class="judging-detail__container-body">
      <!--Body-->
      <BaseTextArea placeholder="Input description here" :style="{'height': '100%'}"></BaseTextArea>
    </div>
    <div class="judging-detail__container-action">
      <!--Action-->
      <BaseButton @click="goToComparison()">Compare</BaseButton>
    </div>
    <div class="judging-detail__container-footer">
      <!--Footer-->
      <BaseButton>Return</BaseButton>
      <BaseButton>Edit</BaseButton>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/judging-detail.js">
</script>

<style lang="scss" scoped>
  .judging-detail__container {
    display: flex;
    flex-direction: column;
    height: 85vh;
    &-header {

    }
    &-body {
      min-height: 55vh;
      padding: 10px 0 20px 0;
    }
    &-action {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
    &-footer {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
