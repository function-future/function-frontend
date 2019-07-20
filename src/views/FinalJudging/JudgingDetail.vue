<template>
  <div class="judging-detail__container">
    <div class="judging-detail__container-header">
      <!--Header-->
      <BaseInput placeholder="Input title here" v-model="judgingDetail.name"></BaseInput>
    </div>
    <div class="judging-detail__container-body">
      <!--Body-->
      <BaseTextArea class="judging-detail__container-body-description" placeholder="Input description here" :style="{'height': '100%'}" v-model="judgingDetail.description"></BaseTextArea>
      <BaseCard v-if="!isLoading" class="judging-detail__container-body-student-list" :style="{'padding': '15px 10px' ,'margin': '10px 0 10px 15px'}">
        <div class="judging-detail__container-body-student-list__header">
          <div class="judging-detail__container-body-student-list__header-title">
            Students
          </div>
          <div class="judging-detail__container-body-student-list__header-button">
            <font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon>
          </div>
        </div>
        <div class="judging-detail__container-body-student-list__content">
          <BaseCard v-for="student in selectedStudents" :key="student.id" :style="{'padding': '15px 5px', 'margin': '10px 0'}" class="judging-detail__container-body-student-list__content-item">
            <img :src="student.avatar" alt="" class="judging-detail__container-body-student-list__content-item-image">
            <div class="judging-detail__container-body-student-list__content-item-detail">
              <span class="judging-detail__container-body-student-list__content-item-detail-name">{{student.name}}</span>
              <span class="judging-detail__container-body-student-list__content-item-detail-university">{{student.university}}</span>
            </div>
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
        &__header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 5px;
          border-bottom: 1px solid #BDBDBD;
        }
        &__content {
          padding-left: 5px;
          overflow: auto;
          max-height: 90%;
          &::-webkit-scrollbar-track
          {
            background-color: #F5F5F5;
            border-radius: 10px;
          }

          &::-webkit-scrollbar
          {
            width: 10px;
            background-color: #02AAF3;
            border-radius: 10px;
          }

          &::-webkit-scrollbar-thumb
          {
            border-radius: 10px;
            background-color: #02AAF3;
          }
          &-item {
            width: 90%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            &-image {
              flex: 1;
            }
            &-detail {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              &-university {
                font-size: smaller;
              }
            }
          }
        }
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
