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
import { storeToRefs } from "pinia"
import {computed, onMounted, ref} from "vue"
import {useServiceStore} from "@/stores/services";

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  professionId: {default: 0}
})

const storeService = useServiceStore()

const { getServicesByProfession } = storeToRefs(storeService)
const services = computed(() => {
  if (props.professionId) {
    return getServicesByProfession.value(props.professionId)
  }

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