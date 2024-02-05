<template>
  <aside>
    <div>
      <router-link to="/">home /</router-link
      ><router-link to="/account" class="active">account</router-link>
    </div>
    <button @click="logOut">Logout</button>
  </aside>
  <div class="account">
    <img
      :src="
        user.profile_image
          ? baseUrl + '/' + user.profile_image
          : '../../assets/images/hutao.png'
      "
      class="profile-image"
    />
    <div class="user-details">
      <p>username: {{ user.username }}</p>
      <p>email: {{ user.email }}</p>
      <p>
        Name: <span>{{ user.first_name }}</span> {{ " " }}
        <span>{{ user.last_name }}</span>
      </p>
      <p>
        Address:
        {{ user.address }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { baseUrl, userEndpoint } from "../../js/Variables.js";
import { apiGet, apiFetch, dispatchCustomEvent } from "../../js/Functions.js";

const authenticated = ref("");
const router = useRouter();
const user = ref({});

onBeforeMount(() => {
  authenticated.value = JSON.parse(sessionStorage.getItem("user"));
  if (!authenticated.value) {
    router.push("/account/login");
  } else {
    getUser();
  }
});

async function getUser() {
  const data = await apiGet(
    userEndpoint + authenticated.value.user.id,
    authenticated.value.token
  );
  user.value = data;
}

async function removeAPIToken() {
  //clears user-tokens from server and session storage
  console.log(authenticated.value)
  try {
    const logoutData = await apiFetch(
      "/logout",
      "POST",
      "application/json",
      authenticated.value.token,
      user.value
    );

   
    if (logoutData instanceof Object) {
      sessionStorage.removeItem("user");
      dispatchCustomEvent('logout');
      alert("You are now logged out.");
    } else {
      console.error("Invalid JSON in removeAPIToken:", logoutData);
    }
  } catch (error) {
    console.error("Error in removeAPIToken:", error);
  }
}

async function logOut() {
  window.dispatchEvent(new Event("authenticated"));
  await removeAPIToken();
  authenticated.value = false;
  router.push("/");
}
</script>

<style scoped>
@import url(./css/Account.css);
@import url(../css/Breadcrumb.css);
</style>
