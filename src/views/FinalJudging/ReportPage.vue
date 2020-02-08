<template>
  <div class="auto-overflow-container">
    <div class="report_container">
      <div v-for="student in studentList">
        <UserListItem :imageUrl="student.avatar">
          <template #name>
            {{student.name}}
          </template>
          <template #info>
            <div>
              {{batch(student)}}
            </div>
            <div>
              {{student.university}}
            </div>
          </template>
          <template #actions>
            <div class="point-container">
              {{student.finalPoint}}
            </div>
          </template>
        </UserListItem>
      </div>
      <infinite-loading @infinite="initStudents"
                        spinner="spiral">
        <div slot="no-more"></div>
        <div slot="no-results"></div>
      </infinite-loading>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/report-page.js">
</script>

<style scoped lang="scss">
@import "@/assets/css/main.scss";

  .report-container {
    @media only screen and (max-width: 1023px) {
      margin-bottom: 10vh;
    }
  }

  .point-container {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    padding: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid #BDBDBD;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

</style>
