<template>
  <v-select
      @update:modelValue="serviceChange"
      :items="services"
      item-title="name"
      item-value="id"
      label="Услуга"
  />
</template>

<script setup>
// import { storeToRefs } from "pinia"
import {computed, onMounted, ref} from "vue"
import {useServiceStore} from "@/stores/services";

const emit = defineEmits(['update:modelValue'])

const storeService = useServiceStore()

// const { getServicesByProfession } = storeToRefs(storeService)
const services = computed(() => {
  // return getServicesByProfession.value(1)
  return storeService.getServices
})

onMounted(() => {
  storeService.fetchServices()
})

function serviceChange(newValue) {
  emit('update:modelValue', newValue)
}
</script>

<style scoped>

</style>