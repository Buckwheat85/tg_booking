<template>

  <v-app>

    <main-app-bar-view
        v-model:drawer="drawer"
    />

    <main-menu-view
        v-model:drawer="drawer"
    />

    <v-app-bar location="bottom">
      <v-app-bar-title>2023с</v-app-bar-title>
    </v-app-bar>

    <v-main>


        <router-view/>


    </v-main>
  </v-app>

</template>

<script setup>
import {useProfessionStore} from "@/stores/professions";
import MainAppBarView from "@/views/MainAppBarView"
import MainMenuView from "@/views/MainMenuView"
import {ref} from "vue"

const drawer = ref(null)
const professionsStore = useProfessionStore()

</script>

<style>
.logo-text {
  font-family: ParsekCyrillic;
  text-transform: none !important;
  letter-spacing: unset !important;
}

@font-face {
  font-family: "ParsekCyrillic";
  src: local("ParsekCyrillic"),
  url("@/assets/fonts/ParsekCyrillic.ttf");
}

/*для vue-cal график работы, иначе не видно рабочие дни*/
.dp__theme_light {
  --dp-highlight-color: rgba(25, 118, 210, 0.3) !important; /*в компоненте datepicker подсвеченные элементы были слишком прозрачные*/
}
</style>
