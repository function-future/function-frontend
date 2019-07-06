<template>
  <div class="main-container">
    <div class="profile-section">
      <BaseCard :style="{height: '100%'}" class="profile-section__card">
        <div class="profile-section__card-image">
          <img src="points.avatar" alt="Image not available"> <!--TODO: CHANGE IMG SRC TO WHATEVER THE API RETURNS !-->
        </div>
        <div class="profile-section__card-detail">
          <h2>{{points.studentName}}</h2>
          <span>{{points.university}}</span>
          <span>Batch {{points.batchCode}}</span>
        </div>
      </BaseCard>
    </div>
    <div class="points-section">
      <BaseCard :style="{height: '100%'}" class="point-section__card">
        <span>Summary</span>
        <div class="points-section__card-scrollable-content">
          <BaseCard v-for="point in points.scores" class="points-section__card-item" :key="point.id">
            <div class="points-section__card-item-detail">
              <h2>{{point.type}}</h2>
              <span>{{point.title}}</span>
            </div>
            <div class="points-section__card-item-score">
              <div class="points-section__card-item-score-border">
                {{point.point}}
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
    height: 90%;

    .profile-section {
      height: 20%;
      &__card {
        display: flex;
        flex-direction: row;
        &-detail {
          display: flex;
          flex-direction: column;
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
          &-detail {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }
          &-score {
            align-self: center;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 70px;
            height: 70px;
            &-border {
              border-radius: 100%;
              border: 4px solid black;
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: larger;
              font-weight: bolder;
            }
          }
        }
      }
    }
  }
</style>
