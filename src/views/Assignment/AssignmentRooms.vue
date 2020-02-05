<template>
  <div class="auto-overflow-container">
    <div class="room_container">
      <div class="card-container columns is-mobile">
        <div class="card detail-card-container
                  is-rounded
                  column
                  is-one-fifth-desktop
                  is-three-fifths-mobile
                  is-offset-one-fifth-mobile" v-for="room in rooms">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="room.avatar || require('@/assets/profile-picture-placeholder.png')" alt="Placeholder image" class="rounded-image">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">{{ room.name }}</p>
                <p class="subtitle is-6">{{ room.university }}</p>
              </div>
            </div>
          </div>
          <footer class="card-footer detail-card-footer">
            <b-button @click="goToRoomDetail(room)" class="card-footer-item is-primary detail-card-footer-action" outlined>
              Detail
            </b-button>
          </footer>
        </div>
      </div>
      <div class="pagination-wrapper">
        <b-pagination
          :total="paging.totalRecords"
          :current.sync="paging.page"
          :per-page="paging.size"
          @change="loadPage"
          range-before="1"
          range-after="2"
          order="is-centered">
        </b-pagination>
      </div>
    </div>
  </div>
</template>

<script src="./js/assignment-rooms.js">
</script>


<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .room_container {
    margin-bottom: 10vh;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .detail-card {
    &-container {
      @media only screen and (min-width: 768px) {
        margin-left: 20px;
        margin-right: 20px;
      }
      margin-top: 15px;
      margin-bottom: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &-footer {
      margin-top: auto;
      &-action {
        border-radius: 0 0 0.5rem 0.5rem;
        display: flex;
        align-items: center;
        padding: 0;
        width: 100%;
      }
    }
  }

  .rounded-image {
    -webkit-border-radius: 0.5rem 0.5rem 0 0;
    -moz-border-radius: 0.5rem 0.5rem 0 0;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .pagination {
    &-wrapper {
      margin: 1rem 0.5rem;
    }
  }

  .column {
    padding: 0!important;
  }
</style>
