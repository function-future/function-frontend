<template>
  <div class="scrollable-container">
    <div class="button-div">
      <label class="select-all">
        <input type="checkbox" v-model="allSelected" @click.stop="selectAll">
        <span class="checkbox">
          <font-awesome-icon icon="check" class="blue check" size="xs" v-if="allSelected"/>
        </span>
        <span>Select All</span>
      </label>
      <BaseButton @click.stop="openCopySelectedCourseModal"
                  type="submit" buttonClass="button-save button-icon" class="copy" :disabled="!this.selectedIds.length">
        <font-awesome-icon icon="copy" class="icon"></font-awesome-icon> Copy Selected Course
      </BaseButton>
      <BaseButton type="submit" buttonClass="button-save" @click="goToAddMasterCourse">
        <span><font-awesome-icon icon="plus" class="icon"/> Add</span>
      </BaseButton>
    </div>
    <div v-for="course in masterCourses" :key="course.id" class="course__row">
      <div class="course__col">
        <label>
          <input type="checkbox" :value="course.id" v-model="selectedIds" @click="select">
          <span class="checkbox">
            <font-awesome-icon icon="check" class="blue check" size="xs" v-if="selectedIds.includes(course.id)"/>
          </span>
        </label>
      </div>
      <div class="course__col--courses">
        <CourseCard :course="course" @click.native="goToThisMasterCourseDetail(course.id)"
                    @edit="goToEditMasterCourse(course.id)" @delete="openDeleteConfirmationModal(course.id)"
                    @copy="openCopyCourseModal(course.id)">
        </CourseCard>
      </div>
    </div>
    <infinite-loading @infinite="initPage" spinner="spiral">
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="showDeleteConfirmationModal = false"
                               @clickDelete="deleteThisMasterCourse">
      <div slot="description">Are you sure you want to delete this master course?</div>
    </modal-delete-confirmation>
    <modal-copy-course v-if="showCopyCourseModal" @close="showCopyCourseModal = false" @copy="submitCopyCourse"></modal-copy-course>
  </div>
</template>

<script type="text/javascript" src="./js/master-courses.js"></script>

<style scoped lang="scss">
  .card {
    margin: 5px 10px;
  }

  .button-div {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-right: 20px;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .course {
    &__row {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    &__col {
      margin-left: 9px;

      &--courses {
        flex-grow: 1;
      }
    }
  }

  .icon {
    margin-right: 5px;
  }

  .copy {
    font-size: 1em;
    margin-right: 5px;
  }

  .select-all {
    display: flex;
    font-size: 1em;
    color: white;
    background-color: #02AAF3;
    border-radius: 50px;
    padding: 7px 20px 7px 10px !important;
    margin-right: auto;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    span {
      display: flex;
      align-items: center;
    }
  }

  input[type=checkbox] {
    display: none;
  }

  .checkbox {
    display: flex;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 20px;
    width: 20px;
    margin-right: 5px;
  }

  .check {
    margin: auto;
  }
</style>
