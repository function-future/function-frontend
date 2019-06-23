<template>
  <div>
    <div class="button-div">
      <BaseButton type="submit" buttonClass="button-save" @click="createNewBatch">
        <span><font-awesome-icon icon="plus" class="icon"/> New</span>
      </BaseButton>
    </div>
    <div class="batch-div">
      <div class="batch" v-for="batch in batches" :key="batch.id">
        <BatchCard :batch="batch" @click.native="goToCourse(batch.code)"></BatchCard>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/course-batch.js"></script>

<style scoped>
  .batch-div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-right: 15px;
  }

  .batch {
    flex: 0 0 33%;

  }

  .button-div {
    text-align: right;
    margin-right: 30px;
    margin-bottom: 10px;
  }
</style>
