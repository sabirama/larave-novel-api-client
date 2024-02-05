<template>
  <form class="form login" @click="clickHandler">
    <fieldset>
      <legend>Log in</legend>

      <input
        type="text"
        placeholder="username"
        v-model="username"
        @change="formData.username = username"
      />

      <input
        type="password"
        placeholder="password"
        v-model="password"
        @change="formData.password = password"
      />

      <small
        ><router-link to="/account/password-reset"
          >forgot password?</router-link
        ></small
      >

      <button @click="updateForm">Login</button>
    </fieldset>
  </form>

  <div class="other-links">
    <span>Don't have an account yet? </span>
    <router-link to="/account/register">Register here.</router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginEndpoint } from "../../js/Variables.js";
import { apiFetch, dispatchCustomEvent } from "../../js/Functions.js";

const router = useRouter();
const username = ref("");
const password = ref("");

const formData = ref({
  username: "user",
  password: "password",
});

async function logInUser(body) {
  const data = await apiFetch(
    loginEndpoint,
    "POST",
    "application/json",
    null,
    body
  );
  if (data.error) {
    alert("Error Login.");
  }
  if (data.user) {
    sessionStorage.setItem("user", JSON.stringify(data));
    dispatchCustomEvent('authenticated');
    router.push("/");
  }
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
