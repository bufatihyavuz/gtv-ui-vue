<template>
  <q-layout class="maincolor">
    <navbar />
    <q-page-container>
      <div class="row q-pa-sm">
        <card v-for="data in videos" :data="data" :key="data" />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import card from "components/Card.vue";
import navbar from "layouts/Navbar";
import VideoService from "../services/VideoService"

export default {
  components: {
    card,
    navbar,
  },

  data: () => ({
    videos: [],
  }),


  methods: {


    async getAll() {
      await VideoService.getAll().then(res => {
        this.videos = res.data;
      })
        .catch(e => {
          console.log(e);
        });
    }

  },

  mounted() {
    this.getAll();
  },

  watch: {
    $route() {
      this.getAll();
    }

  }

};
</script>
