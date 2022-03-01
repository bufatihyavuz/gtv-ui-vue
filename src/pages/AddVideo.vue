<template>
  <q-layout view="hHh lpR fFf" >
    <navbar />
    <q-page-container>
      <div class="row q-ma-xl no-wrap ">
        <q-input  v-model="ytVideoId" class="col" outlined square placeholder="Lütfen video ID'si giriniz.." />
      </div>

      <div class="row q-ma-xl">
        <q-select class="col-4" v-model="categoryModel" :options="categories" option-label="name" option-value="id" label="Category Name"/>
        <q-btn @click="saveVideo()" color="primary q-ma-md" >Kaydet</q-btn>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import VideoService from "../services/VideoService"
import { ref } from 'vue'
import navbar from "layouts/Navbar.vue";
export default {
  components: {
    navbar,
  },


  data: () => ({
    ytVideoId : null,
    categoryModel:ref(null) ,
    categories : [
      {
        id : ref(null) ,
        name : ""
      }
    ],
    categoryId:null,
    videoInput : {
      ytVideoId : null,
      categoryId : null
    }

  }),

  methods : {

    async getCategories() {
      await VideoService.getCategories().then(res => {
        this.categories =  res.data;
      })
        .catch(e => {
          console.log(e);
        });

    },

    saveVideo(){
      this.videoInput.ytVideoId = this.ytVideoId;
      this.videoInput.categoryId = this.categoryModel.id;
      VideoService.saveVideos(this.videoInput).then(res => {
          console.log("saveVideo res",res)
      })
    }

  },

  mounted() {
    console.log("mounted girdi")
   this.getCategories();
  },

  watch : {
    $route () {
      console.log("watcha girdi")
      this.getCategories()
    },
    async saveVideos() {
      await VideoService.saveVideos(videoInput).then(res => {
        this.videos = res.data;

      })
        .catch(e => {
          console.log(e);
        });

    },

  },

};
</script>

<style></style>
