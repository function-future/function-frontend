<template>
  <div class="main-container">
    <div class="profile-section">
      <BaseCard :style="{height: '100%'}" class="profile-section__card">
        <div class="profile-section__card-image">
          <img :src="points.avatar" alt="Image not available" width="100px" height="120px" style="margin-right: 20px; border-radius: 8px">
        </div>
        <div class="profile-section__card-detail">
          <h2>{{points.studentName}}</h2>
          <div>{{points.university}}</div>
          <div>Batch {{points.batchCode}}</div>
        </div>
      </BaseCard>
    </div>
    <div class="points-section">
      <BaseCard :style="{height: '100%'}" class="point-section__card">
        <span style="font-weight: bold; font-size: 30px">Summary</span>
        <div class="points-section__card-scrollable-content">
          <BaseCard v-for="point in points.scores" class="points-section__card-item" :key="point.id">
            <div class="points-section__card-item-detail">
              <h3>{{point.type}}</h3>
              <h4>{{point.title}}</h4>
            </div>
            <div class="points-section__card-item-score">
              <div class="points-section__card-item-score-border">
                <div class="points-section__card-item-score-border-point">{{point.point}}</div>
              </div>
            </div>
          </BaseCard>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/point.js">
</script>

<style lang="scss" scoped>
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 85%;

    .profile-section {
      height: 20%;
      &__card {
        display: flex;
        flex-direction: row;
        &-detail {
          margin-top: -10px;
        }
        &-image {
          width: 100px;
          height: 100px;
          border-radius: 10px;
          border: 1px solid black;
          margin-right: 15px;
        }
      }
    }

    .points-section {
      height: 70%;
      &__card {
        display: flex;
        flex-direction: column;
        &-scrollable-content {
          max-height: 90%;
          overflow: auto;
          padding-right: 5px;
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
        }
        &-item {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 10px 20px;
          &-detail {
            h3 {
              font-size: 18px;
            }
            h3, h4 {
              margin: 10px 0;
            }
            h4 {
              font-weight: normal;
              font-size: 16px;
              margin-left: 12px;
            }
          }
          &-score {
            align-self: center;
            width: 50px;
            height: 50px;
            text-align: center;
            &-border {
              border-radius: 100%;
              border: 3px solid rgba(0, 0, 0, 0.3);
              width: 100%;
              height: 100%;
              font-size: larger;
              font-weight: bolder;
              &-point {
                color: rgba(0, 0, 0, 0.8);
                margin-top: 1.85vh;
                margin-left: auto;
                margin-right: auto;
              }
            }
          }
        }
      }
    }
  }
</style>
