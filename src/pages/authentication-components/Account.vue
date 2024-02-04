<template>
    <main class="account">
      <button @click="logOut">Logout</button>  
    </main>
  </template>
  
  <script setup>
  import { ref, onBeforeMount } from "vue";
  import { useRouter } from "vue-router";
  import { userEndpoint } from '../../js/Variables.js';
  import { apiGet, apiFetch } from '../../js/Functions.js';
  
  const authenticated = ref("");
  const router = useRouter();
  const user = ref({});
  
  onBeforeMount(() => {
    authenticated.value = sessionStorage.getItem("user")?.replace(/["]/g, "");
    if (!authenticated.value) {
      router.push("/account/login");
    } else {
      getUser();
    }
  }) 
  
  async function getUser() {
    const data = await apiGet(userEndpoint, authenticated.value);
    user.value = data;
  }
  
  async function removeAPIToken() {
  try {
    const logoutData = await apiFetch('/logout', 'POST', 'application/json', authenticated.value, user.value);
    console.log(user.value)
    if (logoutData instanceof Object) {
      // Check if logoutData is a valid JSON object
      sessionStorage.removeItem('user');
      alert("You are now logged out.");
    } else {
      // Handle the case where logoutData is not valid JSON (possibly an error page)
      console.error('Invalid JSON in removeAPIToken:', logoutData);
      // You can redirect to an error page or handle the error in some other way
    }
  } catch (error) {
    console.error('Error in removeAPIToken:', error);
    // Handle other errors as needed
  }
}
  
  async function logOut() {
    window.dispatchEvent(new Event('authenticated'));
    await removeAPIToken();
    authenticated.value = false;
    router.push('/');
  }
  </script>
  
  <style scoped></style>