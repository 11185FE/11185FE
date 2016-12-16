<template>
    <div>
        <form action="/job/add" method="post">
            <div class="form-group">
                <label for="">锅名</label>
                <input type="text" name="name" class="form-control">
            </div>
               <div class="form-group">
                <label for="">介绍</label>
                <input type="text" name="desc" class="form-control">
            </div>
            <div class="form-group">
                <label for="">截止时间</label>
                <input type="date" name="needDoneDate" :value="date" class="form-control">
            </div>
            
            <button type="submit" class="btn btn-primary">添加</button>
        </form>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                date:new Date().toLocaleDateString()
            }
        }
    }
</script>