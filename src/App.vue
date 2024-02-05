<template>
  <AppHeader />
  <router-view></router-view>
  <AppFooter />
</template>

<script setup>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import { apiFetch, dispatchCustomEvent } from "./js/Functions.js";
import { bookEndpoint } from "./js/Variables";

const testUser = async () => {
  if (sessionStorage.getItem("user")) {
    try {
      const data = await apiFetch(
        bookEndpoint + 0,
        "POST",
        "application/json",
        JSON.parse(sessionStorage.getItem("user"))?.token
      );
      if (data.message) {
       return
      } else {
        console.log("unauthenticated");
      }
    } catch (e) {
      sessionStorage.removeItem("user");
      dispatchCustomEvent("logout");
    }
  }
};
testUser();
</script>

<style scoped></style>
