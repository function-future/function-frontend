<template>
  <div>
    <div class="comparison-item__container">
      <div class="comparison-item__profile">
        <div class="comparison-item__profile-image">
          <figure class="image is-64x64 is-image-horizontal-center">
            <img class="is-rounded" v-if="!studentData.avatar"
                 :src="require('@/assets/profile-picture-placeholder.png')">
            <img class="is-rounded" v-else :src="studentData.avatar">
          </figure>
        </div>
        <div class="comparison-item__profile-data">
          <span class="comparison-item__profile-name is-size-5 has-text-weight-bold">{{studentData.name}}</span>
          <span class="comparison-item__profile-name is-size-7 has-text-weight-light">{{studentData.university}}</span>
          <span class="comparison-item__profile-name">Total Points: {{pointData.totalPoint}}</span>
        </div>
        <div class="is-hidden-desktop comparison-item__profile-modal">
          <b-button type="is-primary" icon-right="pencil-alt" @click="isMobileScoreModalVisible=true" v-if="accessList.add">
            {{finalScore}}
          </b-button>
          <!--<b-button @click="isMobileScoreModalVisible = true">Score</b-button>-->
        </div>
      </div>
      <div class="comparison-item__detail">
        <b-tabs type="is-boxed" v-model="activeTab">
          <b-tab-item class="comparison-item__detail-list" v-for="tab in tabs" :key="tab.value" :label="tab.label">
            <div>
              <div v-if="!!pointData && !!pointData.scores" >
                <ListItem v-for="score in scoreList"
                          :key="score.title">
                  <template #title>
                    {{score.title}}
                  </template>
                  <template #actions>
                    {{score.point}}
                  </template>
                </ListItem>
              </div>
              <div v-else>
                <EmptyState :src="tab.value">
                  <template #title>
                    Looks like this student have yet to finish any {{ tab.value }}!
                  </template>
                </EmptyState>
              </div>
            </div>
          </b-tab-item>
        </b-tabs>
        <infinite-loading @infinite="getPointsData" spinner="spiral" :identifier="infiniteId" force-use-infinite-wrapper=".comparison-item__detail-list">
          <div slot="no-more"></div>
          <div slot="no-results"></div>
        </infinite-loading>
      </div>
      <div class="comparison-item__final-score is-hidden-mobile" v-if="accessList.add">
        <b-field label="Final Score" label-position="on-border" grouped>
          <b-input class="comparison-item__final-score-input" v-model="finalScore"></b-input>
          <p class="control">
            <b-button class="button is-primary" @click="submitFinalScore">Submit</b-button>
          </p>
        </b-field>
      </div>
    </div>
    <modal-input-final-score v-if="isMobileScoreModalVisible" :studentData="studentData" :point="finalScore" @finalizeScore="getFinalScoreFromModal" @close="closeScoreModal">
    </modal-input-final-score>
  </div>
</template>

<script type="text/javascript" src="./js/comparison-item.js"></script>

<style scoped lang="scss">
  @import "@/assets/css/main.scss";

  .comparison-item {
    &__container {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    &__profile {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 20%;
      margin-bottom: 0.75rem;
      &-image {

      }
      &-data {
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
      }
      &-modal {
        margin-left: auto;
      }
    }

    &__detail {
      height: 40vh;
      overflow-y: auto;
    }

    &__final-score {
      padding: 1rem;

      &-input {
        min-width: 80%;
        max-width: 85%;
      }
    }
  }
</style>
