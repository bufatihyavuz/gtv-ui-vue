<template>
  <li class="video_li ">
    <q-card
      @click="persistent = true"
      flat
      square
      unelevated
      class="cursor-pointer"
    >
        <img
          :src="'https://img.youtube.com/vi/' + data.url + '/0.jpg'"
        />
        <q-list>
          <q-item clickable id="qitem">
            <q-item-section avatar id="upbanner">
              <q-icon>
                <img
                  width="45"
                  src="https://i.hizliresim.com/mmf1pkq.png"
                  alt=""
                />
              </q-icon>
            </q-item-section>
          </q-item>
          <q-item id="denemesa">
            <q-item-section>
              <q-item-label class="title"
                ><strong>{{ data.title }}</strong></q-item-label
              >
              <q-item-label id="subtitle" caption>{{
                data.userName
              }}</q-item-label>
              <q-item-label class="views" caption
                >{{ data.viewCount }} Görüntüleme • {{ data.createDate }} Gün
                önce</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
    </q-card>
  </li>

  <q-dialog
    v-model="persistent"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card id="diacard" style="width: 850px; max-width: 100vw; height: 100vh">
      <q-card-section>
        <div class="q-video">
          <q-video
            :src="'https://www.youtube.com/embed/' + data.url"
            frameborder="0"
            allowfullscreen
            :ratio="16 / 9"
          />
        </div>
      </q-card-section>
      <div>
        <q-item-section avatar>
          <q-icon>
            <img
              id="pp"
              style="margin: 45px 0px 0px 40px"
              :width="50"
              src="https://i.hizliresim.com/mmf1pkq.png"
              alt=""
            />
          </q-icon>
        </q-item-section>
        <h6 id="bigtitle" style="margin: -15px 0 0 70px">{{ data.title }}</h6>
        <q-item>
          <q-item-section>
            <q-item-label caption style="margin: 5px 0 0 10px" class="infos">{{
              data.userName
            }}</q-item-label>
            <q-item-label style="margin-left: 10px" caption class="infos"
              >{{ data.viewCount }} görüntüleme • {{ data.createDate }} gün
              önce</q-item-label
            >
          </q-item-section>

          <q-btn
            class="userbtn"
            rounded
            dense
            flat
            color="grey-8"
            icon="thumb_up"
            v-if="$q.screen.gt.sm"
          >
            <span style="margin-left: 10px">{{ data.like }}</span>
            <q-tooltip class="likedis">Bunu Beğendim</q-tooltip>
          </q-btn>
          <q-btn
            class="userbtn"
            style="margin-left: 10px"
            rounded
            dense
            flat
            color="grey-8"
            icon="share"
            v-if="$q.screen.gt.sm"
          >
            <span style="margin-left: 10px">Paylaş</span>
            <q-tooltip class="likedis">Paylaş</q-tooltip>
          </q-btn>
        </q-item>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["data"],
  data: () => ({
    persistent: ref(false),
  }),
};
</script>

<style>
.title {
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
#subtitle {
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
.views {
  margin-top: 3px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
#qitem {
  padding: 0px;
}
#upbanner {
  margin-left: 12px;
  margin-top: 15px;
}
#denemesa {
  padding-left: 55px;
  margin-top: -50px;
}
.q-card img:first-child {
  border-top-left-radius: unset;
  border-top-right-radius: unset;
}
.video_li {
  width: 25%;
  padding-right: 10px;
  padding-bottom: 40px;
  list-style-type: none;
  display: inline-block;
}
.q-card__section--vert {
  padding: 0px;
}
#dialogtitle {
  margin-top: 5px;
}

h6 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.infos {
  padding: 0 0 0 45px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
#diacard::-webkit-scrollbar {
  display: none;
}

</style>
