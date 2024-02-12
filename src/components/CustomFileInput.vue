<template>
  <div class="custom-file-container input">
    <input
      type="file"
      ref="fileInput"
      class="custom-file-input"
      accept="image/jpg, image/jpeg, image/png"
      @change="handleFileChange"
    />
    <label class="custom-file-label" @click="triggerFileInput">Change image</label>
    <img :src="imageUrl" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: '' // To store the URL of the selected image
    };
  },
  methods: {
    handleFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        // Read the selected file and set its URL to imageUrl
        this.imageUrl = URL.createObjectURL(file);
      }
    },
    triggerFileInput() {
      // To trigger the file input click event, you can access the input element using $refs
      this.$refs.fileInput.click();
    }
  }
}
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

.custom-file-container img {
  position: absolute;
}
</style>
