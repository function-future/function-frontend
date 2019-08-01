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
              <span class="comparison-item__base-total-card-info-point">{{student.point}}</span>
            </div>
          </BaseCard>
        </div>
        <div class="comparison-item__base-detail">
          <BaseCard :style="{'padding': '15px 10px'}">
            <span class="comparison-item__base-detail-title">Quiz & Assignments</span>
            <div class="comparison-item__base-detail-card">
              <BaseCard v-for="score in student.scores" :key="score.id" class="comparison-item__base-detail-card-item">
                <div class="comparison-item__base-detail-card-item-info">
                  <span class="comparison-item__base-detail-card-item-info-type">{{score.type}}</span>
                  <span class="comparison-item__base-detail-card-item-title">{{score.title}}</span>
                </div>
                <div class="comparison-item__base-detail-card-item-content">
                  <span class="">{{score.point}}</span>
                </div>
              </BaseCard>
            </div>
          </BaseCard>
        </div>
        <div class="comparison-item__base-score">
          <span class="comparison-item__base-score-title">Final Score</span>
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
              border: 1px solid black;
            }
            &-info {
              display: flex;
              flex-direction: column;
              margin: 0 auto;
              align-items: center;
              font-weight: bold;
              &-name {
                font-size: 18px;
              }
              &-university {
                margin-top: 5px;
                font-size: 15px;
              }
            }
          }
        }
        &-total {
          &-card {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            &-text {
              font-weight: bold;
              margin-left: -15px;
            }
            &-info {
              display: flex;
              align-items: center;
              justify-content: center;
              border: 5px solid rgba(0, 0, 0, 0.2);
              border-radius: 100%;
              height: 5.5vh;
              width: 5.5vh;
              &-point {
                font-size: 20px;
                font-weight: bold;
              }
            }
          }
        }
        &-detail {
          &-title {
            padding-left: 5px;
            font-size: 15px;
            font-weight: bold;
            margin: auto 0;
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
              width: 4px;
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
          margin: 15px;
          padding: 0;
          display: flex;
          align-items: center;
          &-title {
            width: 100px;
          }
          &-field {
            margin-left: 10px;
            width: 90%;
          }
        }
      }
    }
  }
</style>
