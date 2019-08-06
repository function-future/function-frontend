<template>
    <div class="container">
      <logging-room-create v-if="title"
                           :title="title"
                           :description="description"
                           :members="members"
                           :isEdit="true"
      ></logging-room-create>
    </div>
</template>

<script src="./js/logging-room-edit.js">
</script>
<style scoped>

</style>
