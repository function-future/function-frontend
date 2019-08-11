<template>
  <div>
    <ReportCard v-for="student in studentList" :user="student" :score="student.finalPoint">
    </ReportCard>
    <infinite-loading direction="top"
                      @infinite="initStudents"
                      spinner="spiral"
                      force-use-infinite-wrapper=".scrollable">
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
  </div>
</template>

<script type="text/javascript" src="./js/report-page.js">
</script>

<style scoped>

</style>
