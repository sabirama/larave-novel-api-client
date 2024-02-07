<template>
  <form class="form register" @click="clickHandler">
    <fieldset>
      <legend>Register</legend>
      <input type="text" placeholder="username" v-model="username" />
      <input type="email" placeholder="email" v-model="email" />
      <input type="text" placeholder="password" v-model="password" />
      <input
        type="text"
        placeholder="confirm-password"
        v-model="confirmPassword"
      />
      <button @click="updateForm">Register</button>
    </fieldset>
  </form>
  <div v-if="loading" class="loader">...submitting form.</div>
  <div class="other-links">
    <span>Already have an account yet?</span>
    <router-link to="/account/login">...Login here.</router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { paths } from "../../js/Variables.js";
import { apiFetch, dispatchCustomEvent } from "../../js/Functions.js";

const loading = ref(false);
const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const formData = ref({
  username: "user",
  email: "email",
  password: "password",
  confirmPassword: "password",
});

async function registerUser(body) {
  const data = await apiFetch(
    paths.registerEndpoint,
    "POST",
    "application/json",
    null,
    body
  );
  if (data.error){
    alert('Username or email already exist.');
  }
  if (data.user) {
    sessionStorage.setItem("user", JSON.stringify(data));
    dispatchCustomEvent('authenticated');
    router.push('/');
  }
}

function updateForm(e) {
  e.preventDefault();
  loading.value = true;
  try {
    if (username.value.length >= 8) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email.value && emailRegex.test(email.value)) {
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
          if (password.value == confirmPassword.value) {
            const data = (formData.value = {
              username: username.value,
              email: email.value,
              password: password.value,
            });

            registerUser(data);
          } else {
            alert("Confirm password do not match");
          }
        } else {
          alert("Password is invalid.");
        }
      } else {
        alert("invalid email address.");
      }
    } else {
      alert("username must be atleast 8 characters.");
    }
  } catch (error) {
    console.error(error.message);
  }
}
</script>

<style scoped>
@import url(./css/Form.css);
</style>
