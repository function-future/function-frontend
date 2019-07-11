<template>
    <div>
      <BaseCard class="card-container">
        <BaseInput :label="title" class="input input-title"></BaseInput>
        <BaseInput :label="description" class="input input-description"></BaseInput>
      </BaseCard>
    </div>
</template>

<script src="./js/QuestionnaireForm.js">
</script>

<style scoped>
  .card-container {
    padding: 10px;
    margin : 0px;
    margin-top: 20px;
    height: 60vh;
  }
</style>
