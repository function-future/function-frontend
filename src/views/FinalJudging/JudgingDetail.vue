<template>
  <div class="judging-detail__container">
    <div class="judging-detail__container-header">
      <!--Header-->
      <BaseInput placeholder="Input title here"></BaseInput>
    </div>
    <div class="judging-detail__container-body">
      <!--Body-->
      <BaseTextArea class="judging-detail__container-body-description" placeholder="Input description here" :style="{'height': '100%'}"></BaseTextArea>
      <BaseCard v-if="isLoading" class="judging-detail__container-body-student-list" :style="{'margin': '10px 0 10px 15px'}">
        <div class="judging-detail__container-body-student-list__header">
          <div class="judging-detail__container-body-student-list__header-title">
            Students
          </div>
          <div class="judging-detail__container-body-student-list__header-button">
            <font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon>
            <!--Style this ^^-->
          </div>
        </div>
        <div class="judging-detail__container-body-student-list__content">
          <BaseCard v-for="student in studentId">
<!--Make template and logic-->
          </BaseCard>
        </div>
      </BaseCard>
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
      display: flex;
      justify-content: space-between;
      &-description {
        flex: 1;
      }
      &-student-list {
        width: 20%;
        height: 100%;
      }
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
