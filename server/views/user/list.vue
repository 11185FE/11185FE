<template>
    <div>
        <ul>
            <li v-for="user in users">
                <p>username:{{user.username}}</p>
                <p>pw:{{user.pw}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return {}
        }
    }
</script>