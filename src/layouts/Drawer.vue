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
      id="eastbtn"
      style="margin-left: 10px; margin-top: 5px"
      size="16px"
      dense
      round
      unelevated
      icon="east"
      @click="miniState = !miniState"
    ></q-btn>

    <div v-for="djson in dJson" :key="djson">

      <router-link :to="'/GamesNew/'+ djson.id" style="text-decoration: none">
        <q-item id="logos" clickable v-ripple>
          <q-item-section aria-pressed="true" avatar>
            <q-img width="40px" :src="djson.gamelogo"></q-img>
          </q-item-section>
          <q-item-section id="gamename">{{ djson.gamename }}</q-item-section>
        </q-item>
      </router-link>
    </div>
  </q-drawer>
</template>

<script>
import json from "src/data/drawer.json";
export default {
  props: ["data"],
  data: () => ({
    drawer: false,
    miniState: true,
    dJson: json,
  }),
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
