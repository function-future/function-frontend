<template>
  <div class="add-judging__container">
    <div class="add-judging__container-header">
      <!--Header-->
      <BaseInput placeholder="Input title here" v-model="judgingDetail.name"></BaseInput>
    </div>
    <div class="add-judging__container-body">
      <!--Body-->
      <BaseTextArea class="add-judging__container-body-description" placeholder="Input description here" :style="{'height': '100%'}" v-model="judgingDetail.description"></BaseTextArea>
      <BaseCard class="add-judging__container-body-student-list" :style="{'padding': '15px 10px' ,'margin': '10px 0 10px 15px'}">
        <div class="add-judging__container-body-student-list__header">
          <div class="add-judging__container-body-student-list__header-title">
            Students
          </div>
          <div class="add-judging__container-body-student-list__header-button">
            <font-awesome-icon icon="plus-circle" class="icon blue" size="lg" @click="toggleSelectStudentModal"></font-awesome-icon>
          </div>
        </div>
        <div class="add-judging__container-body-student-list__content">
          <BaseCard v-for="student in selectedStudents" :key="student.id" :style="{'padding': '15px 5px', 'margin': '10px 0'}" class="add-judging__container-body-student-list__content-item">
            <img :src="student.avatar" alt="" class="add-judging__container-body-student-list__content-item-image">
            <div class="add-judging__container-body-student-list__content-item-detail">
              <span class="add-judging__container-body-student-list__content-item-detail-name" :class="{name_smaller: student.name.length > 13}">{{student.name}}</span>
              <span class="add-judging__container-body-student-list__content-item-detail-university" :class="{university_smaller: student.name.length > 13}">{{student.university}}</span>
            </div>
          </BaseCard>
        </div>
      </BaseCard>
    </div>
    <div class="add-judging__container-footer">
      <!--Footer-->
      <BaseButton class="button-cancel" @click="returnButtonClicked">Cancel</BaseButton>
      <BaseButton class="button-save" @click="actionButtonClicked">Save</BaseButton>
    </div>
    <ModalSelectMultipleStudents  v-if="showSelectStudentModal"
                                  :currentlySelected="selectedStudents"
                                  @close="closeSelectStudentModal"
                                  @selected="setSelectedStudents">

    </ModalSelectMultipleStudents>
  </div>
</template>

<script type="text/javascript" src="./js/add-judging.js">
</script>

<style lang="scss" scoped>
  .add-judging__container {
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
          &-title {
            font-weight: bold;
            font-size: 20px;
            margin-left: 5px;
          }
          &-button {
            margin-right: 5px;
            cursor: pointer;
          }
        }
        &__content {
          padding-left: 10px;
          overflow: auto;
          max-height: 90%;
          &::-webkit-scrollbar-track
          {
            background-color: #F5F5F5;
            border-radius: 7px;
          }

          &::-webkit-scrollbar
          {
            width: 2px;
            background-color: #02AAF3;
            border-radius: 7px;
          }

          &::-webkit-scrollbar-thumb
          {
            border-radius: 10px;
            background-color: #02AAF3;
          }
          &-item {
            width: 95%;
            display: flex;
            height: 80px;
            &-image {
              width: 70px;
              height: 50px;
              margin: 0 10px;
              border-radius: 7px;
            }
            &-detail {
              display: flex;
              flex-direction: column;
              font-size: 15px;
              align-items: center;
              margin: 10px auto;
              font-weight: bold;
              &-university {
                margin-top: 3px;
                font-size: 13px;
              }
            }
          }
        }
      }
    }
    .name_smaller {
      font-size: 12px;
    }
    .university_smaller {
      font-size: 11px;
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
