<template lang="html">
    <div>
        <h1>{{title}}</h1>
        <p v-on:click="boom">Welcome to the {{title}} demo. Click a link:</p>
        <input v-model="message" placeholder="edit me">
        <message :message="message"></message>

        <div class="test-objs">
            <div v-for="test in tests" class="test-obj">
                <span>boom {{test.boom}}</span>
                <span>date {{test.date}}</span>
            </div>
        </div>
    </div>
</template>

<script 可以被res.render覆盖comps除外>
    export default {
        data: function () {
            return {
                title: "boomshakalaka"
            }
        },
        methods: {
            boom: function () {
                console.info(233)
            }
        }
        // components: ['message']
    }
</script>

<style lang="css" 没什么卵用>
*{
    font-size: 100px;
}
</style>