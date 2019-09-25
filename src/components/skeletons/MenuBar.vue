<template>
  <b-menu  class="navbar">
    <b-menu-list class="menu-list">
      <b-menu-item class="menu-item"
                   label="Feeds"
                   tag="router-link" exact
                   :to="{ name: 'feeds' }">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Announcements"
                   tag="router-link"
                   :to="{ name: 'announcements' }">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Blogs"
                   tag="router-link"
                   :to="{ name: 'activityBlogs' }">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Courses"
                   tag="router-link"
                   :to="{ name: 'courseBatches' }"
                   v-if="menuList.courses">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Files"
                   tag="router-link"
                   :to="{ name: 'files' }"
                   v-if="menuList.files">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Users"
                   tag="router-link"
                   :to="{ name: 'users' }"
                   v-if="menuList.users">
      </b-menu-item>
      <b-menu-item :active="showGrades"
                   :expanded="showGrades"
                   @click="toggleGradesMenu"
                   v-if="menuList.assignments">
        <template slot="label" slot-scope="props">
          Grades
          <b-icon
            class="is-pulled-right"
            :icon="props.expanded ? 'menu-down' : 'menu-up'">
          </b-icon>
        </template>
        <b-menu-item class="menu-item"
                     label="Question Banks"
                     tag="router-link"
                     :to="{ name: 'questionBanks' }"
                     v-if="menuList.questionBanks">
        </b-menu-item>
        <b-menu-item class="menu-item"
                     label="Quizzes"
                     tag="router-link"
                     :to="{ name: 'quizRoute' }"
                     v-if="menuList.quizzes">
        </b-menu-item>
        <b-menu-item class="menu-item"
                     label="Assignments"
                     tag="router-link"
                     :to="{ name: 'assignmentRoute' }"
                     v-if="menuList.assignments">
        </b-menu-item>
        <b-menu-item class="menu-item"
                     label="Comparisons"
                     tag="router-link"
                     :to="{ name: 'judgingBatch' }"
                     v-if="menuList.comparisons">
        </b-menu-item>
        <b-menu-item class="menu-item"
                     label="Points"
                     tag="router-link"
                     :to="{ name: 'points' }"
                     v-if="menuList.points">
        </b-menu-item>
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Chatrooms"
                   tag="router-link"
                   :to="{ name: 'chatrooms' }"
                   v-if="menuList.chatrooms">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Reminders"
                   tag="router-link"
                   :to="{ name: 'reminders' }"
                   v-if="menuList.reminders">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="My Questionnaire"
                   tag="router-link"
                   :to="{ name: 'myQuestionnaire' }"
                   v-if="menuList.myQuestionnaire">
      </b-menu-item>
      <b-menu-item :active="showQuestionnaire"
                   :expanded="showQuestionnaire"
                   @click="toggleQuestionnaireMenu"
                   v-if="menuList.questionnaireAdmin">
        <template slot="label" slot-scope="props">
          Questionnaires Admin
          <b-icon
            class="is-pulled-right"
            :icon="props.expanded ? 'menu-down' : 'menu-up'">
          </b-icon>
        </template>
        <b-menu-item class="menu-item"
                     label="Questionnaires"
                     tag="router-link"
                     :to="{ name: 'questionnaires' }">
        </b-menu-item>
        <b-menu-item class="menu-item"
                     label="Results"
                     tag="router-link"
                     :to="{ name: 'questionnaireResults' }">
        </b-menu-item>
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Logging Rooms"
                   tag="router-link"
                   :to="{ name: 'loggingRoom' }"
                   v-if="menuList.loggingRoom">
      </b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script src="./js/menu-bar.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .navbar {
    /*background-color: #02AAF3;*/
    /*height: 100%;*/
    /*border-radius: 0 18px 18px 0px;*/
    /*box-shadow: 0px 5px 35px 0px rgba(130, 130, 130, 0.5);*/
    /*overflow: hidden;*/
    /*padding: 50px 25px;*/
    /*text-align: left;*/
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 16rem;
    padding: 2rem 1rem;
    background: #f5f5f5;
  }

  .menu-list {

  }

  .menu-item {
    color: #FFFFFF;
  }
</style>
