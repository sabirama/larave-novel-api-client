<template>
  <div class="custom-file-container input">
    <input
      type="file"
      ref="fileInput"
      class="custom-file-input"
      accept="image/jpg, image/jpeg, image/png"
      @change="handleFileChange"
    />
    <label class="custom-file-label" @click="triggerFileInput"
      >Change image</label
    >
  </div>
</template>

<script>
import { paths } from "../js/Variables.js";
import { apiFetch } from "../js/Functions.js";

export default {
  methods: {
    async changeProfilePic() {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const formData = this.$refs.fileInput.files[0]

      try {
        const data = await apiFetch(
          paths.userEndpoint + user?.user?.id,
          "POST",
          "multipart/form-data",
          user?.token,
          formData
        );
      } catch (error) {
        console.error("Error in API request:", error);
      }
    },
    handleFileChange() {
      console.log('test')
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
  },
};
</script>

<style scoped>
.custom-file-container {
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.custom-file-input {
  display: none;
}

.custom-file-label {
  padding: 8px 12px;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
</style>
