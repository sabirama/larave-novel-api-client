<template>
    Account
</template>

<script setup>
   const authenticated = ref(false);

   if (!authenticated) {
    window.location.push('/')
   }
</script>

<style scoped>
</style>