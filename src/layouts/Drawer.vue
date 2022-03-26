<template>
  <q-drawer
    class="drawer"
    v-model="drawer"
    show-if-above
    mini-to-overlay
    :mini="miniState"
    :width="210"
    :breakpoint="100"
    :mini-width="50"
  >
    <div class="row">
      <q-item-section
        class="text-subtitle2 q-mt-xs content-center"
        no-wrap
        v-show="categoryName"
        style="font-size:medium"
      >Oyun Kategorileri</q-item-section>
      <q-btn
        class="transition q-mx-sm q-mt-sm q-mb-sm"
        dense
        round
        @click="changeMiniState(); rotate(); changeCategoryName(); changeMiniIconTooltip();"
        unelevated
        v-bind:style="{ transform: `rotate(${deg}deg)` }"
        icon="east"
      >
        <q-tooltip
          anchor="center right"
          self="center left"
        >{{ !MiniTooltip ? 'Genişlet' : 'Daralt' }}</q-tooltip>
      </q-btn>
    </div>

    <div v-for="data in menuItem" :key="data">
      <q-item :to="'/categories/' + data.id + '/0'" id="logos" clickable v-ripple>
        <q-item-section aria-pressed="true" avatar>
          <q-img width="35px" :src="'/icons/categories/' + data.iconName" />
        </q-item-section>
        <q-item-section>{{ data.name }}</q-item-section>
      </q-item>
    </div>
  </q-drawer>
</template>

<script>
import VideoService from "src/services/VideoService";
import { ref } from 'vue'
export default {

  data: () => ({
    drawer: ref(false),
    miniState: ref(true),
    menuItem: [],
    deg: 0,
    categoryName: ref(false),
    MiniTooltip: ref(false)
  }),

  methods: {

    async getAll() {
      await VideoService.getCategories().then(res => {
        this.menuItem = res.data;
        console.log(res)
      })
        .catch(e => {
          console.log(e);
        });
    },
    rotate() {
      this.deg += 180;
    },
    changeMiniState() {
      this.miniState = !this.miniState
    },
    changeCategoryName() {
      this.categoryName = !this.categoryName
    },
    changeMiniIconTooltip() {
      this.MiniTooltip = !this.MiniTooltip
    },

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

<style>
#logos {
  padding: 8px 14px 8px 8px;
}
#logos:hover {
  filter: brightness(120%);
}
.transition {
  transition: transform 0.5s ease-in-out;
}
.drawer {
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
