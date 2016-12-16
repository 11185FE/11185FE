<template>
    <div style="padding-top:10px;">
        <a href="add" class="btn btn-primary">new 锅</a>
        <div v-for="job in jobs" class="card" style="width:40rem;margin:1rem auto">
        <div class="card-block">
            <h4 class="card-title">{{job.name}}</h4>
            <p class="card-text">{{job.desc}}</p>
            <p class="card-text">needDoneDate:{{job.needDoneDate}}</p>
            <p class="card-text" v-show="job.doneDate">done:{{job.doneDate}}</p>
        </div>

        <ul v-for="teamer in job.teamers" class="list-group list-group-flush">
            <li class="list-group-item">{{teamer}}</li>
        </ul>
        <div class="card-block" v-show="!job.doneDate">
            <a v-show="!job.teamers.includes(username)" :href="`join?id=${job._id}`" class="card-link">{{job.teamers.length?'一起接锅':'接锅'}}</a>
            <a :href="`done?id=${job._id}`"class="card-link" v-show="job.teamers.includes(username)">done</a>
        </div>
        </div>

</div>
</template>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>