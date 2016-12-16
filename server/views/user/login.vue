<template>
    <div>
        <message :message="message"></message>
      
        <form action="/user/login" method="post">
            <div class="form-group">
                <label for="">username</label>
                <input type="text" name="username" class="form-control">
            </div>
            <div class="form-group">
                <label for="">pw</label>
                <input type="password" name="pw" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary">login</button>
              <a href="add" class="btn btn-join">join</a>
        </form>
    </div>
</template>
<script>
    export default{
        data(){
            return{}
        }
    }
</script>