<template>
    <main class="auth">
        <div class="background"><router-view></router-view></div>     
    </main>
</template>

<script setup>
</script>

<style scoped>
   @import url(./css/Main.css);
   .background{
    width: 100%;
    height: calc(100vh - 7.1rem);
    background: url(../assets/images/hutao.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
   }
</style>