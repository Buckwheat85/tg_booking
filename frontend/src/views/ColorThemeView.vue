<template>
  <img src="@/assets/colortheme252.jpg" class="img-fluid mx-auto d-block" alt="colortheme252.jpg">

  <div class="row">
    <div class="text-center col" v-for="el in arrColors">
      <svg class="pick-color" @click="copyToClipboard(el)" height="100" width="100" viewBox="">
        <circle cx="50" cy="50" r="46" stroke="white" stroke-width="5px" :fill="el"/>
      </svg>
      <p>{{ el }}</p>
    </div>
  </div>

  <pop-up
      :color="color"
      :timer="2000"
      v-model:show-pop-up="showPopUp"
      v-if="showPopUp"
  />

  <v-container>
    <div class="text-h2 text-center">Buttons styles</div>
    <v-row class="my-3 justify-space-evenly text-center">
      <v-col cols="12">
        <div class="text-h3">Default</div>
      </v-col>
      <v-btn>default</v-btn>
      <v-btn color="primary">primary</v-btn>
      <v-btn color="seconadry">seconadry</v-btn>
      <v-btn color="success">success</v-btn>
      <v-btn color="info">info</v-btn>
      <v-btn color="warning">warning</v-btn>
      <v-btn color="error">error</v-btn>
    </v-row>
    <v-row class="my-3 justify-space-evenly text-center">
      <v-col cols="12">
        <div class="text-h3">Outlined</div>
      </v-col>
      <v-btn variant="outlined">default</v-btn>
      <v-btn variant="outlined" color="primary">primary</v-btn>
      <v-btn variant="outlined" color="seconadry">seconadry</v-btn>
      <v-btn variant="outlined" color="success">success</v-btn>
      <v-btn variant="outlined" color="info">info</v-btn>
      <v-btn variant="outlined" color="warning">warning</v-btn>
      <v-btn variant="outlined" color="error">error</v-btn>
    </v-row>
    <v-row class="my-3 justify-space-evenly text-center">
      <v-col cols="12">
        <div class="text-h3">Tonal</div>
      </v-col>
      <v-btn variant="tonal">default</v-btn>
      <v-btn variant="tonal" color="primary">primary</v-btn>
      <v-btn variant="tonal" color="seconadry">seconadry</v-btn>
      <v-btn variant="tonal" color="success">success</v-btn>
      <v-btn variant="tonal" color="info">info</v-btn>
      <v-btn variant="tonal" color="warning">warning</v-btn>
      <v-btn variant="tonal" color="error">error</v-btn>
    </v-row>
    <v-row class="my-3 justify-space-evenly text-center">
      <v-col cols="12">
        <div class="text-h3">Elevated</div>
      </v-col>

      <v-btn variant="elevated">default</v-btn>
      <v-btn variant="elevated" color="primary">primary</v-btn>
      <v-btn variant="elevated" color="seconadry">seconadry</v-btn>
      <v-btn variant="elevated" color="success">success</v-btn>
      <v-btn variant="elevated" color="info">info</v-btn>
      <v-btn variant="elevated" color="warning">warning</v-btn>
      <v-btn variant="elevated" color="error">error</v-btn>
    </v-row>
    <v-row class="my-3 justify-space-evenly text-center">
      <v-col cols="12">
        <div class="text-h3">Flat</div>
      </v-col>

      <v-btn variant="flat">default</v-btn>
      <v-btn variant="flat" color="primary">primary</v-btn>
      <v-btn variant="flat" color="seconadry">seconadry</v-btn>
      <v-btn variant="flat" color="success">success</v-btn>
      <v-btn variant="flat" color="info">info</v-btn>
      <v-btn variant="flat" color="warning">warning</v-btn>
      <v-btn variant="flat" color="error">error</v-btn>
    </v-row>
    <v-row class="my-3 justify-space-evenly text-center">
      <v-col cols="12">
        <div class="text-h3">Text</div>
      </v-col>

      <v-btn variant="text">default</v-btn>
      <v-btn variant="text" color="primary">primary</v-btn>
      <v-btn variant="text" color="seconadry">seconadry</v-btn>
      <v-btn variant="text" color="success">success</v-btn>
      <v-btn variant="text" color="info">info</v-btn>
      <v-btn variant="text" color="warning">warning</v-btn>
      <v-btn variant="text" color="error">error</v-btn>
    </v-row>
    <v-row class="my-3 justify-space-evenly text-center">
      <v-col cols="12">
        <div class="text-h3">Plain</div>
      </v-col>

      <v-btn variant="plain">default</v-btn>
      <v-btn variant="plain" color="primary">primary</v-btn>
      <v-btn variant="plain" color="seconadry">seconadry</v-btn>
      <v-btn variant="plain" color="success">success</v-btn>
      <v-btn variant="plain" color="info">info</v-btn>
      <v-btn variant="plain" color="warning">warning</v-btn>
      <v-btn variant="plain" color="error">error</v-btn>
    </v-row>
  </v-container>

</template>

<script setup>
import PopUp from "@/components/miscellaneous/PopUp"
import {ref} from "vue";

const arrColors = [
  "#C06AC9",
  "#E9B9FA",
  "#6161A4",
  "#9780B6",
  "#925364"
]

const color = ref("")
const showPopUp = ref(false)

const notification = ref({
  show: false,
  position: ['bottom', 'right']
})

function copyToClipboard(pickedColor) {
  color.value = pickedColor
  navigator.clipboard.writeText(color.value)
  showPopUp.value = true
}

</script>

<style scoped>

.pick-color {
  cursor: pointer;
}

</style>