<template>
    <div class="selected-user-card">
        <p>{{ user.name }}</p>
        <font-awesome-icon icon="times" class="selected-user-remove" @click="$emit('remove', user.id)" size="lg"/>
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
        -webkit-box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
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
