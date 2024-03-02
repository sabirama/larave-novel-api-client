<template>
  <div class="input-image">
    <input type="file" accept="image/png, image/jpg, image/jpeg" @change="handleFileChange">
    <button @click="uploadFile">Upload</button>
  </div>
</template>

<script>
import { googleUpload, paths } from '../js/Variables.js';
import { apiFetch, dispatchCustomEvent } from '../js/Functions.js';

const user = JSON.parse(sessionStorage.getItem('user'));

export default {
  data() {
    return {
      inputFile: null
    };
  },
  methods: {
    handleFileChange(event) {
      const selectedFile = event.target.files[0];
      this.inputFile = selectedFile;
    },
    async uploadFile() {
      const postData = new FormData();
      postData.append('image', this.inputFile);

      try {
        const response = await fetch(googleUpload, {
          method: "POST",
          headers: {
            // No need to specify Content-Type; it's automatically set for FormData
          },
          body: postData
        });

      const data = await response.json();
      apiFetch(paths.userEndpoint + user.user.id , "PUT", "application/json", user.token, {"profile_image": data.id}).then(()=> {
        dispatchCustomEvent("change_profile_image");
      });
      
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    
    }
  }
};
</script>

<style scoped> 
  .input-image {
    display: flex;
    position: absolute;
    bottom: 20px;
    width: 150px;
  }

  .input-image button {
    padding: .25rem;
    background: rgb(var(--bg-primary));
  }
</style>