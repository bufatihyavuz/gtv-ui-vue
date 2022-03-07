<template>
  <li class="video_li col-xs-12 col-sm-6 col-md-4 col-lg-3 q-px-sm q-py-sm">
    <q-card
      @click="persistent = true"
      flat
      square
      unelevated
      class="cursor-pointer"
    >
        <q-img
          :src="'https://img.youtube.com/vi/' + data.url + '/0.jpg'"
        >
          <div class="absolute-bottom-right text-subtitle2" style="padding:2px 8px 2px 8px">3:50</div>
        </q-img>
        <q-list class="maincolor">
          <q-item clickable class="q-pa-xs">
            <q-item-section avatar class="q-mt-md q-ml-sm">
              <q-icon>
                <img width="45" src="https://i.hizliresim.com/mmf1pkq.png" alt="userLogo" />
              </q-icon>
            </q-item-section>
          </q-item>
          <q-item class="cardMetadata">
            <q-item-section>
              <q-item-label class="cardinfos q-mt-sm text-weight-bold">{{ data.title }}</q-item-label>
              <q-item-label class="cardinfos q-pt-xs" caption>{{data.userName }}</q-item-label>
              <q-item-label class="cardinfos" caption>{{ data.viewCount }} Görüntüleme • {{ data.createDate }} Gün önce</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
    </q-card>
  </li>

  <q-dialog
    v-model="persistent"
    transition-show="scale"
    transition-hide="scale"
    square
  >
    <q-card id="diacard">
      <q-card-section>
        <q-video
          :src="'https://www.youtube.com/embed/' + data.url"
          frameborder="0"
          allowfullscreen
          :ratio="16 / 9"
        />
      </q-card-section>
      <div>
        <q-item-section avatar>
          <q-icon>
            <img
              class="q-ml-xl q-px-lg q-mt-xl"
              :width="50"
              src="https://i.hizliresim.com/mmf1pkq.png"
              alt="dialogUserLogo"
            />
          </q-icon>
        </q-item-section>
        <q-item-label class="q-ml-xl q-px-lg">
          <span id="diaTitle" class="dialoginfos text-weight-bold">{{ data.title }}</span>
        </q-item-label>
        <q-item>
          <q-item-section>
            <q-item-label caption class="dialoginfos q-ml-xl q-px-sm">
              {{
                data.userName
              }}
            </q-item-label>
            <q-item-label class="dialoginfos q-ml-xl q-px-sm" caption>
              {{ data.viewCount }} görüntüleme • {{ data.createDate }} gün
              önce
            </q-item-label>
          </q-item-section>

          <q-btn rounded dense flat color="grey-8" icon="thumb_up" v-if="$q.screen.gt.sm">
            <span style="margin-left: 10px">{{ data.like }}</span>
            <q-tooltip>Bunu Beğendim</q-tooltip>
          </q-btn>
          <q-btn
            style="margin-left: 10px"
            rounded
            dense
            flat
            color="grey-8"
            icon="share"
            v-if="$q.screen.gt.sm"
          >
            <span style="margin-left: 10px">Paylaş</span>
            <q-tooltip>Paylaş</q-tooltip>
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

.video_li {
  list-style-type: none;
}

#diacard::-webkit-scrollbar {
  display: none;
}

.cardinfos{
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-word;
}

.cardMetadata {
  padding-left: 55px;
  margin-top: -50px;
}

.dialoginfos{
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-word;
}

#diacard {
  width: 100%;
  min-width: 65%;
}

#diaTitle {
  font-size: large;
}

.q-card__section--vert {
  padding: 0px;
}

.q-dialog__backdrop {
  backdrop-filter: blur(3px);
}


</style>
