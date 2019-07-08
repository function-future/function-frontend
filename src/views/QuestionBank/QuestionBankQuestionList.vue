<template>
  <div class="scrollable-container">
    <div class="main-container">
      <div class="page-header">
        <BaseButton class="add-btn" type="submit" buttonClass="button-save" @click="redirectToAddQuestion">
          <font-awesome-icon icon="plus" class="icon"/> Add
        </BaseButton>
      </div>
      <BaseCard class="question-card" v-for="question in questionList" :key="question.id" @click.native="redirectToQuestionDetail(question.id)">
        <div class="row">
          <div class="col basic-info" style="flex-grow: 5">
            <h3>{{ question.text }}</h3>
          </div>
          <div class="col actions-div" style="flex-grow: 1">
            <span @click.stop="openDeleteConfirmationModal(question.id)"><font-awesome-icon icon="trash-alt" class="icon red" size="lg"></font-awesome-icon></span>
          </div>
        </div>
      </BaseCard>
    </div>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="closeDeleteConfirmationModal"
                               @clickDelete="deleteThisQuestion">
      <div slot="description">{{selectedId}}</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/question-bank-question-list.js">
</script>

<style lang="scss" scoped>
  .page-header {
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .add-btn {
    justify-self: flex-end;
    margin-left: auto;
  }

  .question-card {
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
  }

  .row {
    display: flex;
    align-items: center;
  }

  .col {
    vertical-align: middle;
    display: inline-block;
    padding: 10px;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 5px;
  }

  .basic-info {
    width: 50%;
  }

  .actions-div {
    align-self: center;
    text-align: center;
  }

  .actions-div span{
    padding: 5px;
    transition: all .2s ease;
  }

  .actions-div span:hover {
    opacity: 0.8;
  }

  .actions-div span:active {
    opacity: 0.9;
  }
</style>
