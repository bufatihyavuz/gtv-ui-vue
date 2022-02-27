<template>
  <q-layout>
    <navbar />
    <q-page-container>
      <div>
        <ul>
          <card  v-for="data in videos" :data="data" :key="data" />
        </ul>
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

  methods : {

    async getAll() {
      console.log("listVideos girdi")
      await VideoService.getAll().then(res => {
        this.videos = res.data;
        console.log(res)
      })
        .catch(e => {
          console.log(e);
        });
    }

  },

  mounted(){
    console.log("mounta girdi")
    this.getAll();
  },

  watch : {
    $route () {
      console.log('watcha girdi')
      this.getAll();
    }

  }

};
</script>

<style>
ul {
  list-style-type: none;
  display: inline-block;
  padding-inline-start: 0px;
  margin-left: 16px;
}
</style>
