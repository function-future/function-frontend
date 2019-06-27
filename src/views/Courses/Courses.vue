<template>
  <div class="scrollable-container">
    <div class="button-div">
      <BaseButton type="submit" buttonClass="button-save" @click="goToAddCourse">
        <span><font-awesome-icon icon="plus" class="icon"/> Add</span>
      </BaseButton>
    </div>
    <div v-for="course in courses" :key="course.id">
      <CourseCard :course="course" @click.native="goToThisCourseDetail(course.id)"
                @edit="goToEditCourse(course.id)" @delete="deleteThisCourse(course.id)">
      </CourseCard>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/courses.js">
</script>

<style scoped>
  .button-div {
    text-align: right;
    margin-right: 20px;
  }
</style>
