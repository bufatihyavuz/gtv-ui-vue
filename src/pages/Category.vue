<template>
  <q-layout class="maincolor">
    <navbar />
    <q-page-container>
      <q-btn
        class="q-mx-sm q-mt-sm"
        flat
        color="grey"
        outline
        @click="filterOpen"
        icon="tune"
        label="filtreler"
      />

      <q-item class="q-ml-sm" v-model="expanded" v-show="expanded">
        <q-item-section>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
          commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
          eveniet doloribus ullam aliquid.
        </q-item-section>
      </q-item>

      <q-separator class="q-mt-sm q-mx-lg" />

      <div class="row q-pa-sm q-mx-sm">
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
    categoryId : "",
    expanded: ref(false)

  }),
  methods : {

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
    filterOpen() {
      this.expanded = !this.expanded
    }


  },

  mounted(){
    this.videoList();
  },

  watch : {
    $route () {
      console.log('watcha girdi')
      this.videoList();
    }

  }
}

</script>

