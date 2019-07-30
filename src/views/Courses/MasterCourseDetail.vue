<template>
  <div class="scrollable-container">
    <BaseCard class="course-card" cardClass="no-pointer">
      <div class="header">
        <h3>{{ masterCourseDetail.title }}</h3>
      </div>
      <div class="header float-right">
        <div class="action">
          <span class="edit-btn" @click.stop="goToEditMasterCourse" v-if="accessList.edit">
            <font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon>
          </span>
          <span class="delete-btn" @click.stop="openDeleteConfirmationModal" v-if="accessList.delete">
            <font-awesome-icon icon="trash-alt" class="icon red" size="lg"></font-awesome-icon>
          </span>
        </div>
      </div>
      <div class="scrollable">
        <a v-if="masterCourseDetail.material !== ''" :href="masterCourseDetail.material" class="download-button">
            <font-awesome-icon icon="download" class="icon"></font-awesome-icon>Download material
        </a>
        <span v-html="descriptionCompiledMarkdown"></span>
      </div>
    </BaseCard>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="showDeleteConfirmationModal = false"
                               @clickDelete="deleteMasterCourse">
      <div slot="description">Are you sure you want to delete this master course?</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/master-course-detail.js"></script>

<style scoped>
  .scrollable {
    overflow: auto;
    margin-bottom: 5px;
    height: 85%;
    padding: 0 10px 5px 5px;
  }

  .course-card {
    height: 70vh;
  }

  .header {
    display: inline-block;
  }

  .float-right {
    float: right;
  }

  .description {
    text-align: justify;
  }

  .action {
    border-left: 1px solid #BDBDBD;
    padding-left: 15px;
    display: inline-block;
  }

  .action span {
    padding: 5px;
    transition: all .2s ease;
  }

  .action span:hover {
    opacity: 0.8;
  }

  .action span:active {
    opacity: 0.9;
  }

  .download-button {
    display: block;
    border: 1px solid #828282;
    border-radius: 10px;
    padding: 10px 20px;
    color: #505050;
    cursor: pointer;
  }

  .download-button:hover {
    background-color: #F2F2F2;
  }

  h3 {
    margin: 5px 0 15px 0;
    text-align: left;
  }

  .icon {
    margin-right: 5px;
  }
</style>
