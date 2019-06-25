<template>
  <div class="scrollable-container">
    <div class="button-div">
      <BaseButton type="submit" buttonClass="button-save" @click="goToAddMasterCourse">
        <span><font-awesome-icon icon="plus" class="icon"/> Add</span>
      </BaseButton>
    </div>
    <div v-for="course in masterCourses" :key="course.id">
      <CourseCard :course="course" @click.native="goToThisMasterCourseDetail(course.id)"
                  @edit="editThisMasterCourse(course.id)" @delete="deleteThisMasterCourse(course.id)">
      </CourseCard>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/master-courses.js"></script>

<style scoped>
  .button-div {
    text-align: right;
    margin-right: 20px;
  }
</style>
