<template>
  <q-layout>
    <navbar />
    <q-page-container>
      <q-btn
        @click="dialogIcon = true"
        class="buttons q-ma-xs"
        outline
        color="info"
        icon="filter_alt"
        label="Filtrele"
      ></q-btn>

      <q-dialog v-model="dialogIcon">
        <q-card>
          <q-card-section class="row items-center q-pa-md">
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <q-input  label="Şampiyon Seç"  />
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-btn-dropdown outline color="info" icon="sort" label="Sırala" class="buttons q-ma-xs" >
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>En popüler</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>Eklenme tarihi (en eski)</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>Eklenme tarihi (en yeni)</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-separator id="sep" />

      <div>
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
    categoryId : ""

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

<style>
#sep{
  margin: 20px 0 40px 0;
}
.buttons{
  margin-top:20px;
}
</style>
