<template>
  <q-layout class="maincolor" view="hHh lpR fFf">
    <navbar />
    <q-page-container class="row">
      <li class="video_li col-xs-12 col-sm-6 col-md-4 q-px-md">
        <q-card class="q-ma-xs q-px-md">
          <h5 class="q-my-md q-mx-md q-pt-lg">Video Ekle</h5>
          <q-card-section>
            <q-form @submit="onSubmit">
              <q-input
                greedy="true"
                v-model="ytVideoId"
                outlined
                square
                placeholder="Video ID"
                :rules="[
                  val => val.length == 11 || val.length == 23 || 'Lütfen geçerli bir ID giriniz'
                ]"
              />
              <q-select
                class="q-my-sm q-mb-xl"
                v-model="categoryModel"
                :options="categories"
                option-label="name"
                option-value="id"
                label="Kategori Adı"
                :rules="[
                  val => val !== null && val !== '' && val.length !== 23 || 'Lütfen kategori seçiniz',
                ]"
              />
              <q-btn
                class="q-mb-md"
                type="submit"
                color="primary"
                @click="saveVideo(); resetAddVideo();"
              >EKLE</q-btn>
            </q-form>
          </q-card-section>
        </q-card>
      </li>

      <li class="video_li col-xs-12 col-sm-6 col-md-4 q-px-md">
        <q-card class="q-ma-xs q-px-md">
          <h5 class="q-my-md q-mx-md q-pt-lg">Video Sil</h5>
          <q-card-section>
            <q-form>
              <q-input
                v-model="videoUrl"
                class="q-mb-md"
                outlined
                square
                placeholder="Video ID"
                :rules="[
                  val => val.length == 11 || val.length == 23 || 'Lütfen geçerli bir ID giriniz'
                ]"
              />
              <q-btn
                class="q-mb-md q-my-sm"
                @click="deleteVideo(); resetDelVideo();"
                color="negative"
              >SİL</q-btn>
            </q-form>
          </q-card-section>
        </q-card>
      </li>

      <li class="video_li col-xs-12 col-sm-6 col-md-4 q-px-md q-mb-md">
        <q-card class="q-ma-xs q-px-md">
          <h5 class="q-my-md q-mx-md q-pt-lg">Kategori Ekle</h5>
          <q-card-section>
            <q-form>
              <q-input v-model="category.name" class="q-mb-md" label="Oyun İsmi" />
              <q-input v-model="category.iconName" class="q-mb-md" label="Icon Adı" />
              <q-btn class="q-my-lg" @click="addCategory()" color="primary">Ekle</q-btn>
            </q-form>
          </q-card-section>
        </q-card>
      </li>
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
    ytVideoId: ref(null),
    categoryModel: ref(null),
    accept: ref(false),
    categories: [
      {
        id: ref(null),
        name: ""
      }
    ],
    categoryId: null,
    videoInput: {
      ytVideoId: null,
      categoryId: null
    },
    videoUrl: null,
    category: {
      name: null,
      iconName: null
    }
  }),



  methods: {

    async getCategories() {
      await VideoService.getCategories().then(res => {
        this.categories = res.data;
      })
        .catch(e => {
          console.log(e);
        });

    },

    saveVideo() {
      this.videoInput.ytVideoId = this.ytVideoId;
      this.videoInput.categoryId = this.categoryModel.id;
      VideoService.saveVideos(this.videoInput).then(res => {
        console.log("saveVideo res", res)
      })
    },

    deleteVideo() {
      console.log("data.videoUrl", this.videoUrl)
      VideoService.deleteVideo(this.videoUrl).then(res => {
        console.log("saveVideo res", res)
      })
    },

    addCategory() {
      console.log("data.category", this.category)
      VideoService.addCategory(this.category).then(res => {
        console.log("addCategory res", res)
      })
    },

    onSubmit() {
      if (accept.value == true) {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },

    resetAddVideo() {
      this.ytVideoId = "Video Başarıyla Eklendi"
      this.categoryModel = "Video Başarıyla Eklendi"
      this.accept = false
    },
    resetDelVideo() {
      this.videoUrl = "Video Başarıyla Silindi"
    },

  },

  mounted() {
    console.log("mounted girdi")
    this.getCategories();
  },

  watch: {
    $route() {
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
