<template>
  <BaseCard cardClass="card-hover no-pointer" class="user-card">
    <div class="row">
      <div class="col basic-info" style="flex-grow: 2">
        <h3>{{ user.name }}</h3>
        <h4>{{ user.university }}</h4>
      </div>
      <div class="col future-info" style="flex-grow: 3">
        <h4>{{ batch }}</h4>
        <h5>{{ user.division }}</h5>
      </div>
      <div class="score-section" style="flex-grow: 1">
        <span>
          {{score}}
        </span>
      </div>
    </div>
  </BaseCard>
</template>

<script type="text/javascript" src="./js/report-card.js">
</script>

<style lang="scss" scoped>
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

  .user-card {
    box-shadow: 1px 0 7px rgba(0, 0, 0, 0.25);
    transition: all .2s ease;

    &:hover {
      box-shadow: 1px 0 5px rgba(0,0,0,0.1), 1px 0 7px rgba(0,0,0,0.3);;
    }
  }

  .basic-info {
    width: 50%;
  }

  .future-info {
    float: right;
  }

  .score-section {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .score-section > span {
    height: 50px;
    width: 50px;
    font-weight: bolder;
    border-radius: 100%;
    border: 3px solid rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
