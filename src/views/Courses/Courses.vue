<template>
  <div class="scrollable-container">
    <div class="button-div">
      <BaseButton type="submit" buttonClass="button-save" @click="goToAddCourse">
        <span><font-awesome-icon icon="plus" class="icon"/> Add</span>
      </BaseButton>
    </div>
    <CourseCard :course="courses[0]" @edit="editThisCourse" @delete="deleteThisCourse"></CourseCard>
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
