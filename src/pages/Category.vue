<template>
  <q-layout class="maincolor">
    <navbar />
    <q-page-container>
      <q-btn
        class="filterbtn q-mx-sm q-mt-sm"
        flat
        color="grey"
        outline
        @click="filterOpen"
        icon="tune"
        label="filtreler"
      />

      <q-item
        class="filterchooses q-mx-sm q-mt-sm"
        v-model="expanded"
        v-show="expanded"
      >
        <q-list>
          <q-item-section>Yükleme Tarihi</q-item-section>
          <q-separator color="grey-9" class="q-mt-sm q-mb-lg" />
          <q-item-label class="q-mt-sm" caption>
            <li
              class="filterchoose q-my-md cursor-pointer"
              v-for="item in filterList"
              :key="item.chooseDate"
            >
              {{ item.chooseDate }}
            </li>
          </q-item-label>
        </q-list>

        <q-list class="q-ml-xl">
          <q-item-section>Video Süresi</q-item-section>
          <q-separator color="grey-9" class="q-mt-sm q-mb-lg" />
          <q-item-label class="q-mt-sm" caption>
            <li
              class="filterchoose q-my-md cursor-pointer"
              v-for="item in filterList"
              :key="item.chooseDuration"
            >
              {{ item.chooseDuration }}
            </li>
          </q-item-label>
        </q-list>
      </q-item>

      <q-separator color="grey-9" class="q-mt-sm q-mx-lg" />

      <q-infinite-scroll :initial-index="-1" @load="onLoad" :offset="10">
        <div class="row q-pa-sm q-mx-sm q-py-sm">
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
import VideoService from "../services/VideoService";
import { ref } from "vue";
import navbar from "layouts/Navbar.vue";
import card from "components/Card.vue";
export default {
  components: {
    navbar,
    card,
  },
  data: () => ({
    videoPagination: null,
    videos: [],
    dialogIcon: ref(false),
    expanded: ref(false),
    categoryId: "",
    filterList: [
      { chooseDate: "Son bir saat" },
      { chooseDate: "Bugün" },
      { chooseDate: "Bu hafta" },
      { chooseDate: "Bu ay" },
      { chooseDate: "Bu yıl" },
      { chooseDuration: "4 Dakikadan kısa" },
      { chooseDuration: "4-20 Dakika" },
      { chooseDuration: "20 Dakikadan Fazla" },
    ],
  }),
  methods: {
    filterOpen() {
      this.expanded = !this.expanded;
    },

    /*   async videoList() {
      this.categoryId = this.$route.params.id;
      await VideoService.getVideosByCategoryId(this.categoryId,0).then(res => {
        this.videoPagination = res.data;
        this.videos = this.videoPagination.videos;
      })
        .catch(e => {
          console.log(e);
        });

    },*/

    onLoad(index, done) {
      console.log("index", index);
      this.categoryId = this.$route.params.id;

      if (index === 0) {
        VideoService.getVideosByCategoryId(this.categoryId, index)
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
          VideoService.getVideosByCategoryId(this.categoryId, index)
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
    console.log("category mounted");
    /* this.videoList();*/
  },

  watch: {
    $route() {
      console.log("category watch");
      //this.videoList();
    },
  },
};
</script>

<style>
.filterbtn .q-focus-helper {
  display: none;
}
.filterchoose {
  font-size: 14px;
}
.filterchooses {
  transition: 0.3s;
}
</style>
