<template>

  <v-select
      @update:modelValue="clientChange"
      :items="clients"
      item-title="name"
      item-value="id"
      label="Клиент"
  />
</template>

<script setup>
import {computed, onMounted, ref} from "vue"
import {useClientStore} from "@/stores/clients";

const emit = defineEmits(['update:modelValue'])

const storeClient = useClientStore()

const clients = computed(() => {
  return storeClient.getClients
})

onMounted(() => {
  storeClient.fetchClients()
})

function clientChange(newValue) {
  emit('update:modelValue', newValue)
}
</script>

<style scoped>

</style>