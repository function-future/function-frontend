<template>
  <b-menu  class="navbar">
    <b-menu-list class="menu-list">
      <b-menu-item class="menu-item"
                   label="Feeds"
                   tag="router-link" exact
                   :active="isActive('feeds')"
                   :to="{ name: 'feeds' }">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Announcements"
                   tag="router-link"
                   :active="isActive('announcements')"
                   :to="{ name: 'announcements' }">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Blogs"
                   tag="router-link"
                   :active="isActive('activityBlogs')"
                   :to="{ name: 'activityBlogs' }">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Batches"
                   tag="router-link"
                   :active="isActive('batches')"
                   :to="{ name: 'batches' }"
                   v-if="menuList.batches">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Courses"
                   tag="router-link"
                   :active="isActive('courses')"
                   :to="{ name: 'courses' }"
                   v-if="menuList.courses"
                   @click.native="updateViewKey">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Users"
                   tag="router-link"
                   :active="isActive('users')"
                   :to="{ name: 'users' }"
                   v-if="menuList.users">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Files"
                   tag="router-link"
                   :active="isActive('folder')"
                   :to="{ name: 'files' }"
                   v-if="menuList.files">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Tasks"
                   tag="router-link"
                   :active="isActive('scoringAdmin')"
                   :to="{ name: 'scoringAdmin' }"
                   v-if="menuList.grades"
                   @click.native="updateViewKey">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Judging"
                   tag="router-link"
                   :active="isActive('judgingList')"
                   :to="{ name: 'judgingList' }"
                   v-if="menuList.comparisons">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Points"
                   tag="router-link"
                   :active="isActive('points')"
                   :to="{ name: 'points' }"
                   v-if="menuList.points">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Chatrooms"
                   tag="router-link"
                   :active="isActive('chatrooms')"
                   :to="{ name: 'chatrooms' }"
                   v-if="menuList.chatrooms">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Reminders"
                   tag="router-link"
                   :active="isActive('reminders')"
                   :to="{ name: 'reminders' }"
                   v-if="menuList.reminders">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="My Questionnaire"
                   tag="router-link"
                   :active="isActive('myQuestionnaire')"
                   :to="{ name: 'myQuestionnaire' }"
                   v-if="menuList.myQuestionnaire">
      </b-menu-item>
      <b-menu-item :active="showQuestionnaire"
                   :expanded="showQuestionnaire"
                   @click="toggleQuestionnaireMenu"
                   v-if="menuList.questionnaireAdmin">
        <template slot="label" slot-scope="props">
          Peer Appraisal
          <b-icon
            class="is-pulled-right"
            :icon="props.expanded ? 'caret-up' : 'caret-down'">
          </b-icon>
        </template>
        <b-menu-item class="menu-item"
                     label="Questionnaires"
                     tag="router-link"
                     :active="isActive('questionnaires')"
                     :to="{ name: 'questionnaires' }">
        </b-menu-item>
        <b-menu-item class="menu-item"
                     label="Results"
                     tag="router-link"
                     :active="isActive('questionnaireResults')"
                     :to="{ name: 'questionnaireResults' }">
        </b-menu-item>
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Logging Rooms"
                   tag="router-link"
                   :active="isActive('loggingRoom')"
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
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 25rem;
    padding: 2rem 2rem 2rem 10rem;
    background: #f9f9f9;
  }

  .menu-item {
    color: #FFFFFF;
  }
</style>
