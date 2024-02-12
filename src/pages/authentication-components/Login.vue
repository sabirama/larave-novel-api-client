<template>
  <form class="form login" @click="clickHandler">
    <fieldset>
      <legend>Log in</legend>

      <input type="text" placeholder="username" v-model="username" @change="formData.username = username" />

      <span>
        <input :type="showPass" placeholder="password" v-model="password" @change="formData.password = password" class="password" />
        <input type="button" @click="toggleShow" :value="show">
      </span>

      <small><router-link to="/account/password-reset">forgot password?</router-link></small>

      <button @click="updateForm">Login</button>
    </fieldset>
  </form>
  <div v-if="loading" class="loader">...submitting form.</div>
  <div v-else-if="!success" class="loader">
    Wrong credentials. <button @click="closeMessage">close</button>
  </div>
  <div class="other-links">
    <span>Don't have an account yet?</span>
    <router-link to="/account/register">...Register here.</router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { paths } from "../../js/Variables.js";
import { apiFetch, dispatchCustomEvent } from "../../js/Functions.js";

const loading = ref(false);
const success = ref(true);
const showPass = ref('password');
const show = ref("🔒")
const router = useRouter();
const username = ref("");
const password = ref("");

const formData = ref({
  username: "user",
  password: "password",
});

function closeMessage() {
  success.value = true;
  loading.value = false;
}

function toggleShow() {
  if (showPass.value === 'password') {
    showPass.value = "text";
    show.value = "👁"
  } else {
    showPass.value = "password";
    show.value = "🔒";
  };
}

async function logInUser(body) {
  loading.value = true;
  await apiFetch(
    paths.loginEndpoint,
    "POST",
    "application/json",
    null,
    body
  ).then((response) => {
    loading.value = false;
    if (response.user) {
      sessionStorage.setItem("user", JSON.stringify(response));
      dispatchCustomEvent("authenticated");
      router.push("/");
    } else {
      success.value = false;
    }
  });
}

function updateForm(e) {
  e.preventDefault();
  try {
    if (username.value.length >= 8) {
      const hasUppercase = /[A-Z]/.test(password.value);
      const hasLowercase = /[a-z]/.test(password.value);
      const hasDigit = /\d/.test(password.value);
      const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/]/.test(
        password.value
      );

      if (
        hasUppercase &&
        hasLowercase &&
        hasDigit &&
        hasSpecialChar &&
        password.value.length >= 8
      ) {
        const data = (formData.value = {
          username: username.value,
          password: password.value,
        });

        logInUser(data);
      } else {
        alert("Password is invalid");
      }
    } else {
      alert("username must be atleast 8 characters.");
    }
  } catch (error) {
    alert("Error:", error.message);
  }
}
</script>

<style scoped>
@import url(./css/Form.css);
</style>
