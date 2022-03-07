<template>
  <q-header class="bg-dark" reveal>
    <q-toolbar>
      <q-btn flat no-caps no-wrap to="/">
        <q-toolbar-title class="text-weight-bold">TopClip</q-toolbar-title>
      </q-btn>
      <q-space />

      <div class="YL__toolbar-input-container row no-wrap">
        <q-input dense placeholder="Ara" class="col" standout square />
        <q-btn id="searchbtn" to="/Search" class="YL__toolbar-input-btn" icon="search" flat>
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

export default {
  props: ["data"],
  data: () => ({
    drawer: false,
    miniState: true
  }),
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
    border-style: solid
    border-color: rgba(0, 0, 0, .12)

</style>

<style>
#searchbtn {
  border-radius: 0px;
  background-color: #404040;
}
</style>
