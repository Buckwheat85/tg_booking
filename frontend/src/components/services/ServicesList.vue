<template>

  <v-table>
    <thead>
    <tr>
      <th>Услуга</th>
      <th>Профессия</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="service in services"
        :key="service.id">
      <td>{{ service.name }}</td>
      <td>{{ service.profName }}</td>
      <td>
        <v-btn
            color="error"
            @click="openDeleteDialog(service.id, service.name)"
        >Удалить
        </v-btn>
      </td>

    </tr>
    </tbody>
  </v-table>

  <confirmation-dialog
      v-model="showDeleteDialog"
      @confirm="deleteService"
  >
    <template #title>Подтвердите удаление</template>
    <template #default>{{ itemToDelete.title }}</template>
    <template #cancel-button>Отмена</template>
    <template #confirm-button>Удалить</template>
  </confirmation-dialog>


  <!--  <table class="table">-->
  <!--    <thead>-->
  <!--    <tr>-->
  <!--      <th scope="col">id</th>-->
  <!--      <th scope="col">Услуга</th>-->
  <!--    </tr>-->
  <!--    </thead>-->
  <!--    <tbody>-->
  <!--    <tr v-for="service in services">-->
  <!--      <th scope="row">{{ service.id }}</th>-->
  <!--      <td>{{ service.name }}</td>-->
  <!--      <td>-->
  <!--        <div class="btn btn-danger" @click="storeService.removeService(service.id)">Удалить</div>-->
  <!--      </td>-->
  <!--    </tr>-->
  <!--    </tbody>-->
  <!--  </table>-->
</template>

<script setup>
import ConfirmationDialog from "@/components/ConfirmationDialog"
import {useServiceStore} from "@/stores/services";
import {computed, onMounted, ref} from "vue";

const showDeleteDialog = ref(false)
const itemToDelete = ref()

const storeService = useServiceStore()

const services = computed(() => {
  return storeService.getServices
})

onMounted(() => {
  storeService.fetchServices()
})

function openDeleteDialog(itemId, itemName) {
  itemToDelete.value = {
    id: itemId,
    title: itemName
  }
  showDeleteDialog.value = true
}

function deleteService() {
  storeService.removeService(itemToDelete.value.id)
  showDeleteDialog.value = false
}
</script>

<style scoped>

</style>