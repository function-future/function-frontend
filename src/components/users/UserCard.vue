<template>
  <BaseCard cardClass="card-hover">
    <div class="row">
      <div class="col basic-info" style="flex-grow: 2">
        <h3>{{ user.name }}</h3>
        <h4>{{ user.university }}</h4>
      </div>
      <div class="col future-info" style="flex-grow: 3">
        <h4>Batch {{ user.batch }}</h4>
        <h5>{{ user.division }}</h5>
      </div>
      <div class="col actions-div" style="flex-grow: 1">
        <span><font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon></span>
        <span><font-awesome-icon icon="trash-alt" class="icon red" size="lg"></font-awesome-icon></span>
      </div>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard'

export default {
  components: { BaseCard },
  data () {
    return {
      user: {
        name: 'Karnando Sepryan',
        university: 'BINUS University',
        batch: '3',
        division: 'Development'
      }
    }
  }
}
</script>

<style scoped>
  .row {
    display: flex;
    align-items: center;
  }

  .col {
    vertical-align: middle;
    display: inline-block;
    padding: 10px;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 5px;
  }

  .basic-info {
  width: 50%;
  }

  .future-info {
    float: right;
  }

  .actions-div {
    align-self: center;
    text-align: center;
  }

  .actions-div span{
    padding: 5px;
    transition: all .2s ease;
  }

  .actions-div span:hover {
    opacity: 0.8;
  }

  .actions-div span:active {
    opacity: 0.9;
  }
</style>
