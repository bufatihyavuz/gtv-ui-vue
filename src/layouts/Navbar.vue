<template>
  <q-header class="bg-dark" reveal>
    <q-toolbar>
      <q-btn glossy="false" padding="0" dense flat no-caps no-wrap to="/">
        <q-img width="40px" src="/icons/logo.png" alt="logo" />GTV
      </q-btn>
      <q-space />

      <div class="YL__toolbar-input-container row no-wrap">
        <q-input v-model="searchString" placeholder="Ara" class="col" standout square dense />
        <q-btn
          id="searchbtn"
          @click="searchVideos"
          class="YL__toolbar-input-btn"
          icon="search"
          flat
        >
          <q-tooltip>Ara</q-tooltip>
        </q-btn>
      </div>

      <q-space />
      <q-btn to="/addVideo" round icon="video_call" flat>
        <q-tooltip>VideoYükle</q-tooltip>
      </q-btn>
    </q-toolbar>
  </q-header>

  <drawer />
</template>

<script>

import drawer from "layouts/Drawer.vue";
import VideoService from "src/services/VideoService";

export default {
  props: ["data"],
  data: () => ({
    drawer: false,
    miniState: true,
    searchString: ""
  }),
  methods: {

    async searchVideos() {
      console.log("searchVideos")
      await VideoService.searchVideos(this.searchString).then(res => {
        console.log("res", res)
        this.videos = res.data;

      })
        .catch(e => {
          console.log(e);
        });
    }

  },

  components: {
    drawer
  },
  beforeMount() {
    this.$q.dark.set(true);
  },

};
</script>

<style lang="sass">

.YL

  &__toolbar-input-container
    min-width: 100px
    width: 55%
</style>

<style>
#searchbtn {
  border-radius: 0px;
  background-color: #404040;
}
</style>
