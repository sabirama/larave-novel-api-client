<template>
  <aside>
    <div>
      <router-link to="/">home /</router-link
      ><router-link to="/account" class="active">account</router-link>
    </div>
    <button @click="logOut">Logout</button>
  </aside>
  <div class="account">
    <div  class="profile-image">
     <img :src=" paths.assetUrl + user[0]?.profile_image" />
   <CustomFileInput />
    </div>
    <div class="user-details">
  
      <p>username: {{ user[0]?.username }}</p>
      <p>email: {{user[0]?.email }}</p>
      <p>
        Name: <span>{{ user[0]?.first_name }}</span> {{ " " }}
        <span>{{ user[0]?.last_name }}</span>
      </p>
      <p>
        Address:
        {{ user[0]?.address }}
      </p>
    </div>
    <div class="upcoming">
      <h3>More features coming.</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { paths } from "../../js/Variables.js";
import { apiGet, apiFetch, dispatchCustomEvent, catchEvent } from "../../js/Functions.js";
import CustomFileInput from "../../components/CustomFileInput.vue";

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
    paths.userEndpoint + authenticated.value.user.id,
    authenticated.value.token
  );
  user.value = data;
}

async function removeAPIToken() {
  //clears user-tokens from server and session storage
  try {
    const logoutData = await apiFetch(
      paths.logoutEndpoint,
      "POST",
      "application/json",
      authenticated.value.token,
      {username: authenticated.value.user.username}
    );

   
    if (logoutData instanceof Object) {
      sessionStorage.removeItem("user");
      Storage.clear();
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
  window.dispatchEvent(new Event("logout"));
  await removeAPIToken().then(() => {
    authenticated.value = false;
  });
  
  router.push("/");
}

catchEvent("change_profile_image", ()=> {
  getUser();
})
</script>

<style scoped>
@import url(./css/Account.css);
@import url(../css/Breadcrumb.css);
</style>
