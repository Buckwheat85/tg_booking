<template>

  <v-table>
    <thead>
    <tr>
      <th>id</th>
      <th>Сотрудник</th>
      <th>Профессия</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="employee in employees">
      <td>{{ employee.id }}</td>
      <td>{{ employee.name }}</td>
      <td>{{ employee.profName }}</td>
      <td>
        <v-btn
            color="error"
            @click="openDeleteDialog(employee.id, employee.name)"
        >Удалить</v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>

  <confirmation-dialog
      v-model="showDeleteDialog"
      @confirm="deleteEmployee"
  >
    <template #title>Подтвердите удаление</template>
    <template #default>{{ itemToDelete.title }}</template>
    <template #cancel-button>Отмена</template>
    <template #confirm-button>Удалить</template>
  </confirmation-dialog>

</template>

<script setup>
import ConfirmationDialog from "@/components/ConfirmationDialog"
import {useEmployeeStore} from "@/stores/employees";
import {computed, onMounted, ref} from "vue";

const showDeleteDialog = ref(false)
const itemToDelete = ref()
const storeEmployee = useEmployeeStore()

const employees = computed(() => {
  return storeEmployee.getEmployees
})

onMounted(() => {
  storeEmployee.fetchEmployees()
})

function openDeleteDialog(itemId, itemName) {
  itemToDelete.value = {
    id: itemId,
    title: itemName
  }
  showDeleteDialog.value = true
}

function deleteEmployee() {
  storeEmployee.removeEmployee(itemToDelete.value.id)
}
</script>

<style scoped>

</style>