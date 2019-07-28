<template>
  <div class="scrollable-container">
    <div class="page-header">
      <BaseButton class="add-btn"
                  type="submit"
                  buttonClass="button-save"
                  @click="addQuestionBank">
        <font-awesome-icon icon="plus"class="icon"/> Add
      </BaseButton>
    </div>
    <BaseCard class="question-bank__card"
              v-for="questionBank in questionBanks"
              :key="questionBank.id"
              @click.native="goToQuestionBankDetail(questionBank.id)"
              cardClass="card-hover">
      <div class="question-bank__card-header-section">
        <div class="question-bank__card-header">
          {{questionBank.title}}
        </div>
        <div class="question-bank__card-header-action">
          <font-awesome-icon
            icon="eye"
            class="icon blue"
            size="lg"
            @click.stop="goToQuestionBankQuestions(questionBank.id)">
          </font-awesome-icon>
          <span>
            <font-awesome-icon
              icon="trash-alt"
              class="icon red"
              size="lg"
              @click.stop="openDeleteConfirmationModal(questionBank.id)"></font-awesome-icon></span>
        </div>
      </div>
      <div class="question-bank__card-body">
        <div class="question-bank__card-body-description">
          {{questionBank.description}}
        </div>
      </div>
    </BaseCard>
    <BasePagination :paging="paging"
                    @loadPage="loadPage"
                    @previousPage="loadPreviousPage"
                    @nextPage="loadNextPage">
    </BasePagination>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="closeDeleteConfirmationModal"
                               @clickDelete="deleteThisQuestionBank">
      <div slot="description">{{selectedId}}</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/question-banks.js">
</script>

<style lang="scss" scoped>
  .page-header {
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .question-bank {
    &__card {
      min-height: 175px;
      display: flex;
      flex-direction: column;
      &:hover {
        cursor: pointer;
        transition: all .3s ease;
        box-shadow: 2px 2px 10px rgba(0,0,0,0.1), 2px 2px 10px rgba(0,0,0,0.3);
      }
      &-header {
        font-weight: bolder;
        font-size: 1.4em;
        display: inline-block;
        &-action {
          float: right;
          border-left: 1px solid #BDBDBD;
          padding-left: 15px;
          display: inline-block;
          & span {
            padding-left: 15px;
          }
        }
      }
      &-body {
        margin-top: 20px;
      }
    }
  }
  .add-btn {
    justify-self: flex-end;
    margin-left: auto;
  }
</style>
