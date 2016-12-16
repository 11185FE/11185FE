<template>
    <form action="/user/add" method="post">
        <div class="form-group">
            <label for="">username</label>
            <input type="text" name="username" v-model="username" class="form-control">
        </div>
        <div class="form-group">
            <label for="">pw</label>
            <input type="password" name="pw" v-model="pw"  class="form-control">
        </div>
        <div class="form-group">
            <label for="">pw-again</label>
            <input type="password" v-model="pwAgain" class="form-control">
            <small v-show="pw!=pwAgain">pw not again</small>
        </div>
        <button type="submit" class="btn btn-primary" v-on:submit="submit">ADD</button>

    </form>

</template>

<script>
export default{
    data(){
        return{
            username:"",
          pw:"",
          pwAgain:""
        }
    },
    methods:{
        submit(e){
            if(!this.pw||!this.username){
                e.preventDefault();
            }
            if(this.pw!=this.pwAgain){
                e.preventDefault();
            }
        }
    }
}
</script>