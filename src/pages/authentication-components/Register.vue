<template>
  <form class="form register" @click="clickHandler">
    <fieldset>
      <legend>Register</legend>
      <input type="text" placeholder="username" v-model="username" />
      <input type="email" placeholder="email" v-model="email" />
      <span>
        <input :type="showPass" placeholder="password" v-model="password" class="password"/>
        <input type="button" :value="show" @click="()=>{toggleShow()}"/>
      </span>
      <span>
        <input
          :type="showConfirmPass"
          placeholder="confirm-password"
          v-model="confirmPassword"
          class="password"
        />
        <input type="button" :value="showConfirm" @click="()=>{toggleShowConfirm()}" />
      </span>
      <button @click="updateForm">Register</button>
    </fieldset>
  </form>
  <div v-if="loading" class="loader">...submitting form.</div>
  <div v-if="!success" class="loader">
    Username or email already exist.
    <button @click="closeMessage">close</button>
  </div>
  <div class="other-links">
    <span>Already have an account?</span>
    <router-link to="/account/login"> ...Login here.</router-link>
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
const showConfirmPass = ref('password');
const show = ref('🔒')
const showConfirm = ref('🔒')
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

function toggleShow() {
  if (showPass.value === 'password') {
    showPass.value = "text";
    show.value = "👁";
  } else {
    showPass.value = "password"
    show.value = "🔒";
  };
}

function toggleShowConfirm() {
  if (showConfirmPass.value === 'password') {
    showConfirmPass.value = "text";
    showConfirm.value = "👁";
  } else {
    showConfirmPass.value = "password";
    showConfirm.value = "🔒";
  };
}

function closeMessage() {
  success.value = true;
  loading.value = false;
}

async function registerUser(body) {
  await apiFetch(
    paths.registerEndpoint,
    "POST",
    "application/json",
    null,
    body
  ).then((response) => {
    loading.value = true;
    if (response.user) {
      loading.value = false;
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
          if (password.value === confirmPassword.value) {
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
