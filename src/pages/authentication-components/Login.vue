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

const username = ref("");

const password = ref("");

const formData = ref({
  username: "user",
  password: "password",
});

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
        console.log("Username and Password is valid");
      } else {
        console.log("Password is invalid");
      }
    } else {
      console.log("username must be atleast 8 characters.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}
</script>

<style scoped>
@import url(./css/Form.css);
</style>
