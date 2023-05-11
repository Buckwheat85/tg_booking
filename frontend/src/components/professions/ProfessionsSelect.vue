<template>
  <v-select
      :model-value="modelValue"
      @update:modelValue="professionChange"
      :items="professions"
      item-title="name"
      item-value="id"
      label="Профессия*"
  ></v-select>
</template>

<script setup>
import { computed, onMounted} from "vue"
import {useProfessionStore} from "@/stores/professions";

const emit = defineEmits(['update:modelValue'])
defineProps(['modelValue'])

const storeProfession = useProfessionStore()
const professions = computed(() => {
  return storeProfession.getProfessions
})
onMounted(() => {
  storeProfession.fetchProfessions()
})

function professionChange(newValue) {
  emit('update:modelValue', newValue)
}
</script>