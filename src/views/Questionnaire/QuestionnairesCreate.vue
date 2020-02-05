<template>
  <div class="questionnaire-create__outer">
    <QuestionnairesEdit
                       :value="questionnaire"
                       :isCreate=isCreate
                       @input="(newValue) => { setCurrentQuestionnaire(newValue) }"
    />
  </div>
</template>

<script src="./js/questionnaires-create.js">
</script>

<style lang="scss" scoped>

</style>
