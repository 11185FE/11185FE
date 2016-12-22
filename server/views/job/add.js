console.info(2333);
$(document).ready(function(){
    $("input[type=date]").val(new Date().toLocaleDateString().replace(/\//g,"-"))
})