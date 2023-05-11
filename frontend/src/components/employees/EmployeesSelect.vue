<template>
  <v-select
      :model-value="props.modelValue"
      @update:modelValue="employeeChange"
      :items="employees"
      item-title="name"
      item-value="id"
      label="Сотрудник"
  />
</template>

<script setup>
import {computed, onMounted, ref} from "vue"
import {useEmployeeStore} from "@/stores/employees";

const emit = defineEmits(['update:modelValue'])
const props = defineProps(['modelValue'])

const storeEmployee = useEmployeeStore()
const employees = computed(() => {
  return storeEmployee.getEmployees
})
onMounted(() => {
  storeEmployee.fetchEmployees()
})

function employeeChange(newValue) {
  emit('update:modelValue', newValue)
}
</script>