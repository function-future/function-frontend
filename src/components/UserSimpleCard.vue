<template>
    <div class="selected-user-card" @click="$emit('remove', user.id)">
        <p>{{ user.name }}</p>
        <font-awesome-icon v-if="showRemove" icon="times" class="selected-user-remove" size="lg"/>
    </div>
</template>
<script src="./js/user-simple-card.js">

</script>
<style scoped>

    .selected-user-card {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin: 3px;
        padding: 5px;
        border-radius: 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid #828282;
    }

    .selected-user-card > p, .selected-user-remove {
        margin: 0;
        font-size: 0.8rem;
    }

    .selected-user-remove {
        margin-left: 10px;
        cursor: pointer;
    }
</style>
