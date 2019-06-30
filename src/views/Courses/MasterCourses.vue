<template>
  <div class="scrollable-container">
    <div class="button-div">
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
        <input type="checkbox" :value="course.id" v-model="selectedIds">
      </div>
      <div class="course__col--courses">
        <CourseCard :course="course" @click.native="goToThisMasterCourseDetail(course.id)"
                    @edit="goToEditMasterCourse(course.id)" @delete="openDeleteConfirmationModal(course.id)"
                    @copy="openCopyCourseModal(course.id)">
        </CourseCard>
      </div>
    </div>
    <BasePagination :paging="paging"
                    @loadPage="loadPage"
                    @previousPage="loadPreviousPage"
                    @nextPage="loadNextPage">
    </BasePagination>
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
  }

  .course {
    &__row {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    &__col {
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
</style>
