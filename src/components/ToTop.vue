<template>
     <button class="to-top" @click="toTop">Back to Top</button>
</template>

<script setup>
 const toTop = () => {
    window.scrollTo(top);
  }
</script>

<style scoped>
</style>