<template>
  <AppHeader />
  <router-view></router-view>
  <AppFooter />
</template>

<script setup>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import { apiGet, dispatchCustomEvent } from "./js/Functions.js";
import { paths } from "./js/Variables";

const testUser = async () => {
  if (sessionStorage.getItem("user")) {
    try {
      await apiGet(
        paths.authCheck,
        JSON.parse(sessionStorage.getItem("user"))?.token);
    } catch (e) {
      alert('Session Logged Out');
      sessionStorage.removeItem("user");
      dispatchCustomEvent("logout");
    }
  }
};
testUser();
</script>

<style scoped></style>
