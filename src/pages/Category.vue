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

      <q-item class="filterchooses q-mx-sm q-mt-sm" v-model="expanded" v-show="expanded">
        <q-list>
          <q-item-section>Yükleme Tarihi</q-item-section>
          <q-separator color="grey-9" class="q-mt-sm q-mb-lg" />
          <q-item-label class="q-mt-sm" caption>
            <li
              class="filterchoose q-my-md cursor-pointer"
              v-for="item in filterList"
              :key="item.chooseDate"
            >{{ item.chooseDate }}</li>
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
            >{{ item.chooseDuration }}</li>
          </q-item-label>
        </q-list>
      </q-item>

      <q-separator color="grey-9" class="q-mt-sm q-mx-lg" />

      <div class="row q-pa-sm q-mx-sm q-py-sm">
        <card v-for="data in videos" :data="data" :key="data" />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import VideoService from "../services/VideoService"
import { ref } from 'vue';
import navbar from "layouts/Navbar.vue";
import card from "components/Card.vue";
export default {
  components: {
    navbar,
    card
  },
  data: () => ({
    videos: [],
    dialogIcon: ref(false),
    expanded: ref(false),
    categoryId: "",
    filterList: [
      { chooseDate: 'Son bir saat' },
      { chooseDate: 'Bugün' },
      { chooseDate: 'Bu hafta' },
      { chooseDate: 'Bu ay' },
      { chooseDate: 'Bu yıl' },
      { chooseDuration: '4 Dakikadan kısa' },
      { chooseDuration: '4-20 Dakika' },
      { chooseDuration: '20 Dakikadan Fazla' },]

  }),
  methods: {

    filterOpen() {
      this.expanded = !this.expanded
    },

    async videoList() {
      this.categoryId = this.$route.params.id;
      console.log("listVideos")
      await VideoService.getVideosByCategoryId(this.categoryId).then(res => {
        this.videos = res.data;
      })
        .catch(e => {
          console.log(e);
        });

    },

  },

  mounted() {
    this.videoList();
  },

  watch: {
    $route() {
      console.log('watcha girdi')
      this.videoList();
    }

  }
}

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

