<template lang="html">

    <div v-show="message" class="alert alert-danger" role="alert">
        <strong>{{message}}</strong>
    </div>
</template>

<script>
    export default {
        props: ['message']
    }
</script>

<style lang="css">

</style>