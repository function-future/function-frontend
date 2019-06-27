<template>
  <div class="scrollable-container">
    <div class="button-div">
      <BaseButton type="submit" buttonClass="button-save" @click="goToAddMasterCourse">
        <span><font-awesome-icon icon="plus" class="icon"/> Add</span>
      </BaseButton>
    </div>
    <div v-for="course in masterCourses" :key="course.id">
      <CourseCard :course="course" @click.native="goToThisMasterCourseDetail(course.id)"
                  @edit="goToEditMasterCourse(course.id)" @delete="openDeleteConfirmationModal(course.id)">
      </CourseCard>
    </div>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="showDeleteConfirmationModal = false"
                               @clickDelete="deleteThisMasterCourse">
      <div slot="description">Are you sure you want to delete this master course?</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/master-courses.js"></script>

<style scoped>
  .button-div {
    text-align: right;
    margin-right: 20px;
  }
</style>
