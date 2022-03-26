<template>
  <q-header class="bg-dark" reveal>
    <q-toolbar>
      <q-btn glossy="false" padding="0" dense flat no-caps no-wrap to="/">
        <q-img width="40px" src="/icons/logo.png" alt="logo" />GTV
      </q-btn>
      <q-space />

      <!-- <q-btn
        to="/search"
        flat
        standout
        square
        dense
        no-caps
        class="YL__toolbar-input-container row no-wrap"
      >
        <q-input v-model="searchString" placeholder="Ara" class="col" flat standout square dense />
        <q-tooltip>Ara</q-tooltip>
      </q-btn>-->

      <q-btn
        align="left"
        class="btn-fixed-width q-px-sm"
        color="dark"
        icon="search"
        @click="openDiaCard = true"
        unelevated
        no-caps
        label="Arama yapmak için tıklayınız"
      >
        <q-tooltip>Ara</q-tooltip>
      </q-btn>

      <!-- Search Page -->
      <q-dialog v-model="openDiaCard" maximized square>
        <q-card>
          <q-layout class="maincolor">
            <q-header class="bg-dark text-white">
              <q-toolbar>
                <q-btn glossy="false" padding="0" dense flat no-caps no-wrap to="/">
                  <q-img width="40px" src="/icons/logo.png" alt="logo" />GTV
                </q-btn>
                <q-space />
                <div class="YL__toolbar-input-container row no-wrap">
                  <!-- <q-btn to="/search" class="YL__toolbar-input-btn searchbtn" icon="search" flat>
            <q-tooltip>Ara</q-tooltip>
                  </q-btn>-->
                  <q-input
                    v-model="search"
                    type="text"
                    placeholder="Ara"
                    class="col"
                    standout
                    square
                    dense
                  >
                    <template v-slot:append>
                      <q-icon
                        v-if="search !== ''"
                        name="close"
                        @click="search = ''"
                        class="cursor-pointer"
                      />
                    </template>

                    <template v-slot:prepend>
                      <q-icon name="search" class="cursor-pointer" />
                    </template>
                  </q-input>
                </div>
                <q-space />
              </q-toolbar>
            </q-header>

            <q-page-container>
              <h6 class="q-mt-md q-mb-xs q-pl-xl q-ml-sm">
                <q-icon
                  size="32px"
                  name="keyboard_return"
                  class="cursor-pointer q-mr-md"
                  @click="openDiaCard = false"
                >
                  <q-tooltip>Ana sayfaya dön</q-tooltip>
                </q-icon>Arama sonuçlarınıza göre...
              </h6>
              <div class="row q-px-xl">
                <card v-for="data in filteredVideo" :data="data" :key="data" />
              </div>
            </q-page-container>
          </q-layout>
        </q-card>
      </q-dialog>

      <!-- <q-btn to="/addVideo" round icon="video_call" flat>
        <q-tooltip>VideoYükle</q-tooltip>
      </q-btn>-->
    </q-toolbar>
  </q-header>
  <drawer />
</template>

<script>
import { ref } from 'vue'
import drawer from "layouts/Drawer.vue";
import card from "components/Card.vue";
import VideoService from "../services/VideoService";

export default {
  props: ["data"],
  data: () => ({
    drawer: false,
    miniState: true,
    openDiaCard: ref(false),
    videos: [],
    search: "",
  }),

  components: {
    drawer,
    card
  },
  beforeMount() {
    this.$q.dark.set(true);
  },

  computed: {
    filteredVideo() {
      return this.videos.filter(data => {
        return data.title.toLowerCase().includes(this.search.toLowerCase()) ||
          data.channelTitle.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },

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
