<template>
  <q-drawer
    id="drawer"
    v-model="drawer"
    show-if-above
    :mini="miniState"
    :width="220"
    :breakpoint="500"
  >
    <q-btn
      id="btnDrawer"
      style="margin-left: 10px; margin-top: 5px"
      size="16px"
      dense
      round
      unelevated
      icon="east"
      @click="miniState = !miniState"
    ></q-btn>

    <div v-for="data in menuItem" :key="data">

      <router-link :to="'/categories/'+ data.id" style="text-decoration: none">

        <q-item id="logos" clickable v-ripple>
          <q-item-section aria-pressed="true" avatar>
            <q-img width="40px"  src="~assets/categories/lol.svg"/>
          </q-item-section>
          <q-item-section>{{ data.name }}</q-item-section>
        </q-item>

      </router-link>

    </div>

  </q-drawer>
</template>

<script>
import VideoService from "src/services/VideoService";
export default {

  data: () => ({
    drawer: false,
    miniState: true,
    menuItem:[]
  }),

  methods : {

    async getAll() {
      await VideoService.getCategories().then(res => {
        this.menuItem = res.data;
        console.log(res)
      })
        .catch(e => {
          console.log(e);
        });
    }

  },

  mounted(){
    this.getAll();
  },

  watch : {
    $route () {
      this.getAll();
    }

  }

};
</script>

<style>
#drawer::-webkit-scrollbar {
  display: none;
}
#drawer {
  position: fixed;
  top: 0px;
  right: 0px;
  float: left;
}
#logos {
  padding: 8px 14px 8px 8px;
}
#logos:hover {
  filter: brightness(120%);
}
</style>
