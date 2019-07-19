<template>
  <div class="comparison__container">
    <BaseCard class="comparison__main-card">
      <div v-for="(student, index) in comparison" :key="student.studentId" class="comparison-item__base">
        <div class="comparison-item__base-profile">
          <BaseCard class="comparison-item__base-profile-card">
            <img :src="student.avatar" alt="" class="comparison-item__base-profile-card-image">
            <div class="comparison-item__base-profile-card-info">
              <span class="comparison-item__base-profile-card-info-name">{{student.studentName}}</span>
              <span class="comparison-item__base-profile-card-info-university">{{student.university}}</span>
            </div>
          </BaseCard>
        </div>
        <div class="comparison-item__base-total">
          <BaseCard class="comparison-item__base-total-card">
            <span class="comparison-item__base-total-card-text">Total Points</span>
            <div class="comparison-item__base-total-card-info">
              <span>{{student.point}}</span>
            </div>
          </BaseCard>
        </div>
        <div class="comparison-item__base-detail">
          <BaseCard :style="{'padding': '15px 10px'}">
            <span class="comparison-item__base-detail-title">Quiz and Assignments</span>
            <div class="comparison-item__base-detail-card">
              <BaseCard v-for="score in student.scores" :key="score.id" class="comparison-item__base-detail-card-item">
                <div class="comparison-item__base-detail-card-item-info">
                  <span class="comparison-item__base-detail-card-item-info-type">{{score.type}}</span>
                  <span class="comparison-item__base-detail-card-item-title">{{score.title}}</span>
                </div>
                <div class="comparison-item__base-detail-card-item-content">
                  <span>{{score.point}}</span>
                </div>
              </BaseCard>
            </div>
          </BaseCard>
        </div>
        <div class="comparison-item__base-score">
          <span>Final Score</span>
          <BaseInput class="comparison-item__base-score-field" type="number" min="0" max="100" v-model="scores[index]"></BaseInput>
        </div>
      </div>
    </BaseCard>
    <div class="comparison__container-footer">
      <BaseButton class="button-cancel" @click="returnButtonClicked">Return</BaseButton>
      <BaseButton class="button-save" @click="submitButtonClicked">Submit</BaseButton>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/comparison.js">
</script>

<style lang="scss" scoped>
  .comparison {
    &__container {
      &-footer {
        display: flex;
        justify-content: flex-end;
      }
    }
    &__main-card {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      justify-content: space-evenly;
    }
    &-item {
      &__base {
        flex: 1;
        &-profile {
          &-card {
            display: flex;
            flex-direction: row;
            align-items: center;
            &-image {
              width: 100px;
              height: 100px;
              margin-right: 20px;
              border-radius: 20px;
            }
            &-info {
              display: flex;
              flex-direction: column;
              &-name {
                font-weight: bolder;
              }
              &-university {}
            }
          }
        }
        &-total {
          &-card {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            &-text {}
            &-info {
              display: flex;
              align-items: center;
              justify-content: center;
              border: 2px solid #000000;
              border-radius: 100%;
              height: 5vh;
              width: 5vh;
            }
          }
        }
        &-detail {
          &-title {
            padding-left: 15px;
          }
          &-card {
            overflow: auto;
            margin-bottom: 5px;
            max-height: 25vh;
            &::-webkit-scrollbar-track
            {
              background-color: #F5F5F5;
              border-radius: 10px;
            }

            &::-webkit-scrollbar
            {
              width: 10px;
              background-color: #02AAF3;
              border-radius: 10px;
            }

            &::-webkit-scrollbar-thumb
            {
              border-radius: 10px;
              background-color: #02AAF3;
            }
            &-item {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              &-info {
                display: flex;
                flex-direction: column;
                &-type {
                  font-weight: bolder;
                }
                &-title {}
              }
              &-content {
                border: 2px solid #000000;
                border-radius: 100%;
                height: 5vh;
                width: 5vh;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
        }
        &-score {
          padding: 0 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &-field {
            flex: 1;
            margin-left: 20px;
          }
        }
      }
    }
  }
</style>
