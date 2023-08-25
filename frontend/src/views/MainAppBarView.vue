<template>

  <v-app-bar
      :density="(mobile?'compact':'default')"
  >
    <template
        v-slot:prepend
    >
      <v-app-bar-nav-icon
          v-show="mobile"
          @click='emit("update:drawer", !props.drawer)'
      />

      <v-btn
          v-show="mobile"
          prepend-icon="mdi-face-woman"
          :to="'/'"
          variant="text"
          size="x-large"
      />
    </template>

    <v-app-bar-title
        v-show="!mobile"
        style="cursor: pointer"
        @click="$router.push('/')"
        class="logo-text"
    >Студия красоты Татьяны Гриценко
    </v-app-bar-title>

    <v-btn 
    v-if="!isLoggedIn"
    icon="mdi-account"
      @click="loginIconClick"
    />
    <v-btn 
    v-if="isLoggedIn"
    icon="mdi-account-check"
      @click="loginIconClick"
    />
   
    <template v-slot:append>
      <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"/>
    </template>
  </v-app-bar>

  <v-container>
    <login-form
    v-model:dialog="dialogLogin"
    />
  </v-container>
</template>

<script setup>
const props = defineProps(['drawer'])
const emit = defineEmits(['update:drawer'])

import {useDisplay} from 'vuetify'

const {mobile} = useDisplay()

import {useTheme} from 'vuetify'
import {computed, ref} from "vue";

const theme = useTheme()

import LoginForm from '@/components/account/LoginForm'
const dialogLogin = ref(false)
const isLoggedIn = ref(true)

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  localStorage.setItem('color-theme', theme.global.name.value)
}

function loginIconClick() {
  dialogLogin.value = true
}

</script>

<style scoped>

</style>