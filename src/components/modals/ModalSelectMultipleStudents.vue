<template>
  <div class="modal__mask">
    <div class="modal__wrapper">
      <div class="modal__container">
        <div class="modal__header">
          <h3 class="modal__header__title">Select Students</h3>
          <span class="modal__close"><font-awesome-icon icon="times" class="icon" @click="close" size="lg"></font-awesome-icon></span>
        </div>
        <div class="modal__selected-list">
          <BaseCard v-for="(student, index) in selectedStudents" class="modal__selected-list-item" :style="{'margin': '10px', 'padding': '10px 15px', 'width': '30%', 'font-weight': 'bold'}">
            <span>{{student.name}}</span>
            <font-awesome-icon icon="times" class="icon" @click="selectedStudents.splice(index, 1)" size="lg"></font-awesome-icon>
          </BaseCard>
        </div>
        <div class="modal__body scrollable-container">
          <label class="batch__row" v-for="student in studentList" :key="student.id">
            <div class="batch__col--batches">
              <UserListCard :name="student.name"
                            :university="student.university"
                            :role="student.role"
                            :batch="student.batch ? student.batch.name : null"
                            :key="student.id"
                            :avatar="student.avatar">
                <div class="batch__col student_checkbox" :class="{active: selectedStudents.includes(student)}">
                  <span class="checkbox">
                    <font-awesome-icon icon="check" class="check" style="color: white;" size="s" v-if="selectedStudents.includes(student)"/>
                  </span>
                  <input type="checkbox"
                         :value="student"
                         :disabled="selectedStudents.length >=3 && selectedStudents.indexOf(student) === -1"
                         v-model="selectedStudents" style="visibility: hidden;">
                </div>
              </UserListCard>
            </div>
          </label>
          <infinite-loading direction="top"
                            @infinite="initStudents"
                            spinner="spiral"
                            force-use-infinite-wrapper=".scrollable">
            <div slot="no-more"></div>
            <div slot="no-results"></div>
          </infinite-loading>
        </div>
        <div class="modal__footer">
          <BaseButton class="modal__footer__button" type="cancel" buttonClass="button-cancel" @click="close">Cancel</BaseButton>
          <BaseButton class="modal__footer__button" type="submit" buttonClass="button-save" @click="selectStudents">Save</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/modal-select-multiple-students.js"></script>

<style lang="scss" scoped>
  .modal {
    &__mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      display: table;
      transition: opacity .3s ease;
    }
    &__wrapper {
      display: table-cell;
      padding-top: 15vh;
    }
    &__container {
      display: flex;
      flex-direction: column;
      width: 35vw;
      margin: 0 auto;
      padding: 10px 20px;
      background-color: #fff;
      border-radius: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
    }
    &__header {
      display: flex;
      align-items: flex-start;
      margin-top: 0.5rem;
      &__title {
        padding: 0.3rem;
        margin: 0;
        text-align: left;
        font-weight: bold;
        font-size: 1.5em;
      }
    }
    &__selected-list {
      display: flex;
      font-size: small;
      justify-content: flex-start;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.1);
      height: 7vh;
      margin-top: 1vh;
      border-radius: 25px;
      &-item {
        display: flex;
        justify-content: space-between;
      }
    }
    &__body {
      margin: 20px 0;
      text-align: left;
      max-height: 45vh;
    }
    &__footer {
      margin-bottom: 0.5rem;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      &__button {
        margin: 0.25rem;
      }
    }
    &__close {
      margin: 0 0 0 auto;
      padding: 0.5rem;
      top: 0;
      float: right;
      cursor: pointer;
      transition: all .2s ease;
      &:hover {
        opacity: 0.8;
      }
      &:active {
        opacity: 0.8;
      }
    }
  }
  .batch {
    &__row {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    &__col {
      &--batches {
        flex-grow: 1;
      }
    }
  }
  .modal-enter {
    opacity: 0;
  }
  modal-enter-active, .modal-leave-active {
    opacity: 0;
  }
  .student_checkbox {
    margin-left: auto;
    margin-right: 25px;
    width: 30px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 50px;
  }
  .active {
    background-color: rgba(2, 170, 243, 0.8);
  }
  .checkbox {
    display: flex;
    margin-top: 8px;
    margin-left: 6px;
  }
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
