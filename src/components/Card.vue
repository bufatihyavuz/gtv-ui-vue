<template>
  <!-- Yusuf fatih -->
  <li class="video_li col-xs-12 col-sm-6 col-md-3 q-px-sm q-pt-sm q-pb-lg">
    <q-card @click="persistent = true" flat square unelevated class="cursor-pointer">
      <q-img :src="'https://img.youtube.com/vi/' + data.url + '/maxresdefault.jpg'">
        <div
          class="absolute-bottom-right text-subtitle2"
          style="padding:2px 8px 2px 8px"
        >{{ data.duration }}</div>
      </q-img>
      <q-list class="maincolor q-pl-xs">
        <q-item-section>
          <q-item-label class="cardinfostitle q-mt-sm text-weight-bold">{{ data.title }}</q-item-label>
          <q-item-label class="cardinfos q-pt-xs" caption>{{ data.channelTitle }}</q-item-label>
          <q-item-label
            class="cardinfos"
            caption
          >{{ data.view }} Görüntüleme • {{ data.createDate }} Gün önce</q-item-label>
        </q-item-section>
      </q-list>
    </q-card>
  </li>

  <q-dialog v-model="persistent" transition-show="scale" transition-hide="scale" square>
    <q-card id="diacard">
      <q-card-section>
        <q-video
          :src="'https://www.youtube.com/embed/' + data.url"
          frameborder="0"
          allowfullscreen
          :ratio="16 / 9"
        />
      </q-card-section>

      <q-item-label>
        <span id="diaTitle" class="dialoginfos text-weight-bold q-pt-md q-px-md">{{ data.title }}</span>
      </q-item-label>
      <q-item class="q-px-md q-pt-xs">
        <q-item-section>
          <q-item-label caption class="dialoginfos">
            {{ data.channelTitle }} • {{ data.view }} görüntüleme • {{ data.createDate }} gün
            önce
          </q-item-label>
        </q-item-section>

        <q-btn
          class="dialogbtnslike"
          rounded
          dense
          flat
          color="grey-8"
          icon="thumb_up"
          v-if="$q.screen.gt.sm"
        >
          <span class="q-ml-xs">{{ data.likeCount }}</span>
          <q-tooltip>Beğeni Sayısı</q-tooltip>
        </q-btn>
        <q-btn
          class="dialogbtnsshare q-mx-xs"
          rounded
          dense
          flat
          color="grey-8"
          icon="share"
          v-if="$q.screen.gt.sm"
          @click.prevent="copyTestingCode"
          @click="changeCopiedMsg()"
          @mouseover="trigger"
        >
          <span class="q-ml-xs">Paylaş</span>
          <q-tooltip>{{ shareMsg }}</q-tooltip>
        </q-btn>
        <input type="hidden" id="testing-code" :value="'https://www.youtube.com/embed/' + data.url" />
      </q-item>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["data"],
  data: () => ({
    persistent: ref(false),
    shareMsg: "Paylaş"
  }),
  methods: {
    copyTestingCode() {
      let testingCodeToCopy = document.querySelector('#testing-code')
      testingCodeToCopy.setAttribute('type', 'text')    // 不是 hidden 才能複製
      testingCodeToCopy.select()

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'kopyalandı' : 'kopyalanamadı';
      } catch (err) {
        alert("Video URl'si kopyalanamadı");
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    },
    changeCopiedMsg() {
      this.shareMsg = "✓ URL Kopyalandı"
    },
    trigger() {
      setTimeout(() => this.shareMsg = 'Paylaş', 5000);
    }
  },
};
</script>

<style>
#diacard::-webkit-scrollbar {
  display: none;
}

.cardinfostitle {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
}
.cardinfos {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-word;
}

.dialoginfos {
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
.dialogbtnslike .q-focus-helper {
  display: none;
}
.dialogbtnsshare .q-focus-helper {
  display: none;
}
.dialogbtnslike {
  cursor: default;
}
</style>
