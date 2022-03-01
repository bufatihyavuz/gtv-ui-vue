<template>
  <q-header id="navbar" class="q-py-xs" height-hint="58">
    <q-toolbar>
      <q-btn flat no-caps no-wrap v-if="$q.screen.gt.xs">
        <router-link to="/" style="text-decoration: none">
          <q-toolbar-title id="LogoLink" class="text-weight-bold"
            >TopClip</q-toolbar-title
          >
        </router-link>
      </q-btn>
      <q-space />

      <div class="YL__toolbar-input-container row no-wrap">
        <q-input dense placeholder="Ara" class="col" standout />
        <router-link to="/Search" style="text-decoration: none">
          <q-btn
            class="YL__toolbar-input-btn"
            text-color="grey-6"
            icon="search"
            flat
          />
        </router-link>
      </div>

      <q-space />
      <router-link to="/addVideo" style="text-decoration: none">
        <q-btn round text-color="grey-6" icon="video_call" flat />
      </router-link>
      <div class="q-gutter-sm row items-center no-wrap">
        <div>
          <q-toggle
            v-model="darkmode"
            color="primary"
            icon="dark_mode"
            @click="$q.dark.toggle()"
          />
        </div>

        <q-btn
          id="btnaccount"
          text-color="white"
          color="positive"
          icon="person"
          label="Oturum Aç"
          @click="logInDia = true"
        ></q-btn>

        <q-dialog
          id="dialogaccount"
          v-model="logInDia"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-card id="cardasd" class="shadow-24" style="width: 500px; height: 100vh">
            <q-card-section style="margin:50px 0 0 20px">
              <h5 style="margin:0 0 0 20px" >Top Clip</h5>
              <text-subtitle style="margin:0 0 0 22px">{{ title }}</text-subtitle>
            </q-card-section>
            <q-card-section>
              <q-fab
                id="artifab"
                color="info"
                @click="switchTypeForm"
                icon="add"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%)"
              >
              </q-fab>
              <q-form id="form" class="q-px-lg q-pt-xl">
                <q-input
                  outlined
                  id="emailinput"
                  ref="Kullanıcı Adı"
                  clearable
                  v-model="email"
                  type="email"
                  lazy-rules
                  :rules="[this.required, this.isEmail, this.short]"
                  label="E-posta"
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
                <q-input
                  ref="username"
                  v-if="register"
                  outlined
                  clearable
                  v-model="username"
                  lazy-rules
                  :rules="[this.required, this.short]"
                  type="username"
                  label="Kullanıcı adı"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
                <q-input
                  ref="password"
                  outlined
                  clearable
                  v-model="password"
                  :type="passwordFieldType"
                  lazy-rules
                  :rules="[this.required, this.short]"
                  label="Şifre"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="visibilityIcon"
                      @click="switchVisibility"
                      class="cursor-pointer"
                    />
                  </template>
                </q-input>
                <q-input
                  ref="repassword"
                  v-if="register"
                  outlined
                  clearable
                  v-model="repassword"
                  :type="passwordFieldType"
                  lazy-rules
                  :rules="[this.required, this.short, this.diffPassword]"
                  label="Şifreyi tekrar giriniz"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="visibilityIcon"
                      @click="switchVisibility"
                      class="cursor-pointer"
                    />
                  </template>
                </q-input>
              </q-form>
            </q-card-section>

            <q-card-actions class="q-px-lg">
              <q-btn
                unelevated
                size="lg"
                color="light-blue-6"
                @click="submit"
                class="full-width text-white"
                :label="btnLabel"
              />
            </q-card-actions>
            <q-card-section v-if="!register" class="text-center q-pa-sm">
              <a class="text-grey-6">Parolanızı mı unuttunuz?</a>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </q-toolbar>
  </q-header>

  <drawer />
</template>

<script>
import drawer from "layouts/Drawer.vue";
import { ref } from "vue";
export default {
  props: ["data"],
  data: () => ({
    drawer: false,
    miniState: true,
    logInDia: ref(false),
    darkmode: ref(false),
    title: "Giriş Yap",
    email: "",
    username: "",
    password: "",
    repassword: "",
    register: false,
    passwordFieldType: "password",
    btnLabel: "Giriş",
    visibility: false,
    visibilityIcon: "visibility",
  }),
  components: {
    drawer,
  },
  methods: {
    required(val) {
      return (val && val.length > 0) || "Bu alanı boş bıraktınız";
    },
    diffPassword(val) {
      const val2 = this.$refs.password.value;
      return (val && val === val2) || "Şifreler eşleşmiyor!";
    },
    short(val) {
      return (val && val.length > 2) || "Girdiğiniz değer çok kısa";
    },
    isEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return (
        emailPattern.test(val) || "Lütfen geçerli bir kullanıcı adı giriniz"
      );
    },
    submit() {
      if (this.register) {
        this.$refs.email.validate();
        this.$refs.username.validate();
        this.$refs.password.validate();
        this.$refs.repassword.validate();
      } else {
        this.$refs.email.validate();
        this.$refs.password.validate();
      }

      if (!this.register)
        if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
          this.$q.notify({
            diloagIcon: "done",
            color: "positive",
            message: "Yetkiniz yok",
          });
        }
    },
    switchTypeForm() {
      this.register = !this.register;
      this.title = this.register ? "Kayıt Ol" : "Giriş Yap";
      this.btnLabel = this.register ? "Kayıt Ol" : "Giriş Yap";
    },
    switchVisibility() {
      this.visibility = !this.visibility;
      this.passwordFieldType = this.visibility ? "text" : "password";
      this.visibilityIcon = this.visibility ? "visibility_off" : "visibility";
    },
  },
};
</script>

<style lang="sass">
.YL

  &__toolbar-input-container
    min-width: 100px
    width: 55%
    border-style: solid
    border-width: 1px 1px 1px 1px
    border-color: rgba(0,0,0,.12)

  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width:  0
    border-color: rgba(0,0,0,.06)
    max-width: 60px
    width: 100%
    height: 40px


  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>

<style>
#drawer::-webkit-scrollbar {
  display: none;
}
#cardasd::-webkit-scrollbar {
  display: none;
}
#drawer {
  position: fixed;
  top: 0px;
  right: 0px;
  float: left;
}
#LogoLink {
  color: rgb(156, 156, 156);
}

#btnaccount {
  transition: 0.4s;
  box-shadow: 0px 0px 4px 0px #21ba45;
}
#btnaccount:hover {
  box-shadow: 0px 0px 32px 2px #21ba45;
}
.q-layout__section--marginal {
  background-color: unset;
  color: unset;
}
#form{
  margin-top:30px
}
#artifab{
  padding-bottom: 10px;
}

</style>
