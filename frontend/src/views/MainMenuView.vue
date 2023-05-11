<template>
  <v-navigation-drawer
      :model-value="props.drawer"
      @update:modelValue="newDrawerState => emit('update:drawer', newDrawerState)"
  >
    <v-list nav>
      <v-list-item v-for="item in items"
                   :to="item.to"
                   :title="item.title"
                   :prepend-icon="item.icon"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const props = defineProps(['drawer'])
const emit = defineEmits(['update:drawer'])

const items = [
  {
    title: 'Главная',
    to: '/',
    icon: 'mdi-home'
  },
  {
    title: 'График работы',
    to: '/employees/timetable',
    icon: 'mdi-calendar-account'
  },
  {
    title: 'Клиенты',
    to: '/clients',
    icon: 'mdi-face-man'
  },
  {
    title: 'Сотрудники',
    to: '/employees',
    icon: 'mdi-account-group'
  },
  {
    title: 'Должности',
    to: '/professions',
    icon: 'mdi-tools'
  },
  {
    title: 'Услуги',
    to: '/services',
    icon: 'mdi-content-cut'
  },
  {
    title: 'Color theme',
    to: '/colortheme',
    icon: 'mdi-palette'
  },
  {
    title: 'TESTS',
    to: '/testform'
  },
  // {
  //   title: 'About',
  //   to: '/about'
  // },
  // {
  //   title: 'WaveUI',
  //   to: '/waveui'
  // }
]

</script>

<style scoped>

</style>