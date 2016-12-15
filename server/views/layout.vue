<template>
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <link href="//cdn.bootcss.com/bootstrap/4.0.0-alpha.5/css/bootstrap.css" rel="stylesheet">
            <script src="//cdn.bootcss.com/vue/2.1.6/vue.js"></script>
        </head>
        <body>
            {{{app}}}
            {{{script}}}
            <script>app.$mount('#app')</script>
        </body>
    </html>
</template>

<script>
</script>
