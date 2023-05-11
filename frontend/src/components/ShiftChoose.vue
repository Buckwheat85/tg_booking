<template>
  <v-card
      class="text-center mx-auto"
      width="350"
      variant="outlined">
    <v-card-title>Время работы {{ shiftFrom.title }}-{{ shiftTo.title }}</v-card-title>
    <v-card-actions class="justify-center">
      <v-btn-toggle
          v-model="shift"
          rounded="0"
          color="deep-purple-accent-3"
          group
          mandatory
      >
        <v-btn value="1">
          Первая<br/>смена
        </v-btn>

        <v-btn value="2">
          Вторая<br/>смена
        </v-btn>

        <v-btn value="3">
          Произвольно
        </v-btn>
      </v-btn-toggle>
    </v-card-actions>

    <v-card-actions>
      <v-select
          :return-object="true"
          :disabled="shift!='3'"
          class="mx-2"
          v-model="shiftFrom"
          :eager="true"
          density="compact"
          :items="workTimeArray"
          label="Начало смены"
      ></v-select>

      <v-select
          :return-object="true"
          :disabled="shift!='3'"
          class="mx-2"
          v-model="shiftTo"
          :eager="true"
          density="compact"
          :items="workTimeArray"
          label="Конец смены"
          :hint="errorTimeTo?'меньше начала':''"
          persistent-hint
      ></v-select>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import {computed, ref, watchEffect} from "vue"

const shift = ref('1')
const shiftFrom = ref()
const shiftTo = ref()

const workTimeArray = computed(() => {
  const arr = []
  for (let h = 8; h < 22; h++) {
    for (let m = 0; h == 21 ? m < 30 : m < 60; m += 30) {
      const obj = {
        title: (h < 10 ? `0${h}` : h) + ':' + (m < 10 ? `0${m}` : m),
        hour: h,
        minute: m,
      }
      arr.push(obj)
    }
  }
  return arr
})

watchEffect(() => {
  if (shift.value == '1') {
    shiftFrom.value = {
        title: '08:00',
        hour: 8,
        minute: 0,
      }
    shiftTo.value = {
        title: '15:00',
        hour: 15,
        minute: 0,
      }
  } else if (shift.value == '2') {
    shiftFrom.value = {
        title: '15:00',
        hour: 15,
        minute: 0,
      }
    shiftTo.value = {
        title: '21:00',
        hour: 21,
        minute: 0,
      }
  }
})

const errorTimeTo = computed(()=>{
  if (shiftTo.value.hour*60+shiftTo.value.minute <= shiftFrom.value.hour*60+shiftFrom.value.minute)
    return true

  return false
})
const emit = defineEmits(['update:modelValue'])
watchEffect(() => {
  emit('update:modelValue', errorTimeTo.value ? null : [shiftFrom.value, shiftTo.value])
})
</script>

<style scoped>

</style>