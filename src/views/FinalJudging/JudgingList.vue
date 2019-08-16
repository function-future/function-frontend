<template>
  <div class="scrollable-container">
    <div class="page-header">
      <BaseButton class="report-btn"
                  buttonClass="button-save"
                  @click="goToReportPage">
        Batch report
      </BaseButton>
      <BaseButton v-if="accessList.add"
                  class="add-btn"
                  type="submit"
                  buttonClass="button-save"
                  @click="addJudging">
        <font-awesome-icon icon="plus" class="icon"/> Add
      </BaseButton>
    </div>
    <BaseCard class="judging__card"
              v-for="judging in judgingList"
              :key="judging.id"
              @click.native="goToJudgingDetail(judging.id)"
              cardClass="card-hover">
      <div class="judging__card-header-section">
        <div class="judging__card-header">
          {{judging.name}}
        </div>
        <div class="judging__card-header-info">
          <div class="judging__card-header-info-date">
            {{ judging.uploadedDate |  moment("dddd, MMMM Do YYYY") }}
          </div>
          <div class="judging__card-header-info-action">
            <font-awesome-icon
              icon="poll"
              class="icon blue"
              size="lg"
              @click.stop="goToComparison(judging.id)">
            </font-awesome-icon>
            <span>
            <font-awesome-icon
              v-if="accessList.delete"
              icon="trash-alt"
              class="icon red"
              size="lg"
              @click.stop="openDeleteConfirmationModal(judging.id)"></font-awesome-icon></span>
          </div>
        </div>
      </div>
      <div class="judging__card-body">
        <div class="judging__card-body-description">
          {{judging.description}}
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
                               @clickDelete="deleteThisJudging">
      <div slot="description">{{selectedId}}</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/judging-list.js">
</script>

<style lang="scss" scoped>
  .page-header {
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .judging {
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
        &-info {
          float: right;
          padding-left: 15px;
          display: inline-block;
          &-date {
            display: inline-block;
            padding-right: 15px;
          }
          &-action {
            border-left: 1px solid #BDBDBD;
            padding-left: 15px;
            display: inline-block;
          }
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

  .report-btn {
    justify-self: flex-start;
    margin-left: 15px;
  }
</style>
