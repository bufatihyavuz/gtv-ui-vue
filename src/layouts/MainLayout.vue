<template>
  <q-layout>
    <navbar />
    <q-page-container class="maincolor">
      <q-infinite-scroll :initial-index="-1" @load="onLoad" :offset="10">
        <div class="row q-pa-sm">
          <card v-for="(data, index) in videos" :data="data" :key="index" />
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
          </div>
        </template>
      </q-infinite-scroll>
    </q-page-container>
  </q-layout>
</template>

<script>
import card from "components/Card.vue";
import navbar from "layouts/Navbar";
import VideoService from "../services/VideoService";

export default {
  components: {
    card,
    navbar,
  },

  data: () => ({
    videoPagination: null,
    videos: [],
  }),

  methods: {
    onLoad(index, done) {
      console.log("index", index);

      if (index === 0) {
        VideoService.getAll(index)
          .then((res) => {
            if (res.data) {
              this.videoPagination = res.data;
              this.videos.push(...this.videoPagination.videos);
            }
          })
          .catch((e) => {
            console.log(e);
          });
        done();
      } else {
        setTimeout(() => {
          VideoService.getAll(index)
            .then((res) => {
              if (res.data) {
                this.videoPagination = res.data;
                this.videos.push(...this.videoPagination.videos);
                return this.videoPagination;
              }
            })
            .then((videos) => {
              if (index === videos.totalPage) {
                done(true);
              }
            })
            .catch((e) => {
              console.log(e);
            });

          done();
        }, 3000);
      }
    },
  },

  mounted() {
    /* console.log("mounted girdi")
     this.getAll();*/
  },

  watch: {
    /*     $route () {
           console.log("watch girdi")
           this.getAll();
         }*/
  },
};
</script>
