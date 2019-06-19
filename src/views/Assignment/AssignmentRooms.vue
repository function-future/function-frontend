<template>
  <div class="container">
    <div class="card-container">
      <div class="detail-card" v-for="room in roomList" @click="goToRoomDetail(room)">
        <div class="detail-card__photo">

        </div>
        <div class="detail-card__title">
          <span>David William</span>
          <span>Jakarta - Team A</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/assignment-rooms.js">
</script>


<style lang="scss" scoped>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .detail-card {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    border-radius: 20px;
    width: 200px;
    height: 300px;
    margin: 15px 20px 20px 15px;
    &:hover {
      cursor: pointer;
      transition: all .3s ease;
      box-shadow: 2px 2px 10px rgba(0,0,0,0.1), 2px 2px 10px rgba(0,0,0,0.3);
    }
    &__photo {
      height: 80%;
      border-bottom: 1px solid black;
    }
    &__title {
      height: 20%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
</style>
