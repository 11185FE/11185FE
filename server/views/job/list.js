$(document).ready(function(){
    $("#search").on("input",function(){
        var val = $(this).val();
        console.info(val)
        $(".card").each(function(index,card){
            var title = $(".card-title",card).text();
            var path = $(".card-text",card).text();
            if(title.indexOf(val)>=0){
                $(this).show();
            }
            else if(path.indexOf(val)>=0){
                $(this).show();
            }
            else{
                $(this).hide();
            }
        })
    })
})