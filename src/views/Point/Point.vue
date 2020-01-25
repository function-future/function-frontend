<template>
  <div class="auto-overflow-container">
    <div class="point__container">
      <div class="point__container__header">
        <UserListItem :imageUrl="currentUser.avatar">
          <template #name>
            {{ currentUser.name }}
          </template>
          <template #info>
            <div>{{ currentUser.batchCode }}</div>
            <div>{{ studentData.university }}</div>
          </template>
          <template #actions>
            <div class="point__container__header-point">
              <span class="has-text-weight-bold">{{ studentData.point }}</span>
            </div>
          </template>
        </UserListItem>
      </div>
      <div class="point__container__tabs">
        <b-tabs v-model="activeTab">
          <b-tab-item v-for="tab in tabs"
                      :key="tab.value"
                      :label="tab.title">
            <div class="point__container__tabs-content">
              <div v-if="isLoading">
                <ListItem v-for="n in 4" v-bind:key="n" :loading="isLoading"></ListItem>
              </div>
              <div v-if="!isLoading && !pointListEmpty"
                   class="point__container__tabs-content__list-wrapper">
                <div class="columns is-multiline">
                  <div class="column is-12"
                       v-for="point in pointList"
                       :key="point.id">
                    <ListItem>
                      <template #title>
                        {{point.title}}
                      </template>
                      <template #actions>
                        <span>{{point.point}}</span>
                      </template>
                    </ListItem>
                  </div>
                </div>
              </div>
              <div v-if="!isLoading">
                <div>
                  <div v-if="pointListEmpty && !failLoadingPoints">
                    <EmptyState :src="activeTabType">
                      <template #title>
                        Looks like you haven't finish any {{tab.value}}!
                      </template>
                    </EmptyState>
                  </div>
                  <div v-if="pointListEmpty && failLoadingPoints">
                    <EmptyState src="error" :errorState="true"></EmptyState>
                  </div>
                </div>
              </div>
            </div>
          </b-tab-item>
        </b-tabs>
        <infinite-loading @infinite="initPage"
                          :identifier="infiniteId"
                          :distance="100">
          <div slot="spinner"></div>
          <div slot="no-more"></div>
          <div slot="no-results"></div>
        </infinite-loading>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/point.js">
</script>


<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 85%;
  }

  .point {
    &__container {
      &__header {
        position: sticky;
        top: -1px;
        z-index: 5;
        background-color: #ffffff;

        &-point {
          height: 100%;
          display: flex;
          align-items: center;
        }
      }

      &__tabs {
        &-content {
          &__list {
            &-wrapper {
              margin-left: 0.25rem;
              margin-right: 0.75rem;

              @media only screen and (max-width: 1023px) {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
  }
</style>
