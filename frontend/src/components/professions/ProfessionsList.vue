<template>

  <v-table>
    <thead>
    <tr>
      <th>Должность</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="prof in professions">
      <td>{{ prof.name }}</td>
      <td>
        <v-btn
            color="error"
            @click="openDeleteDialog(prof.id, prof.name)"
        >Удалить
        </v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>

  <confirmation-dialog
      v-model="showDeleteDialog"
      @confirm="deleteProfession"
  >
    <template #title>Подтвердите удаление</template>
    <template #default>{{ itemToDelete.title }}</template>
    <template #cancel-button>Отмена</template>
    <template #confirm-button>Удалить</template>
  </confirmation-dialog>

</template>

<script setup>
import ConfirmationDialog from "@/components/ConfirmationDialog"
import {ref, onMounted, computed} from "vue"
import {useProfessionStore} from "@/stores/professions"

const showDeleteDialog = ref(false)
const itemToDelete = ref()

const storeProfession = useProfessionStore()
const professions = computed(() => {
  return storeProfession.getProfessions
})

onMounted(() => {
  storeProfession.fetchProfessions()
})

function openDeleteDialog(itemId, itemName) {
  itemToDelete.value = {
    id: itemId,
    title: itemName
  }
  showDeleteDialog.value = true
}

function deleteProfession() {
  storeProfession.removeProfession(itemToDelete.value.id)
  showDeleteDialog.value = false
}
</script>