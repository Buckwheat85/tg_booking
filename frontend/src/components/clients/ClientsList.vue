  <template>
    <v-table>
      <thead>
      <tr>
        <th>Клиент</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="client in clients"
          :key="client.id">
        <td>{{ client.name }}</td>
        <td>
          <v-btn
              color="error"
              @click="openDeleteDialog(client.id, client.name)"
          >Удалить
          </v-btn>
        </td>

      </tr>
      </tbody>
    </v-table>

    <confirmation-dialog
        v-model="showDeleteDialog"
        @confirm="deleteClient"
    >
      <template #title>Подтвердите удаление</template>
      <template #default>{{ itemToDelete.title }}</template>
      <template #cancel-button>Отмена</template>
      <template #confirm-button>Удалить</template>
    </confirmation-dialog>

  </template>

  <script setup>
  import ConfirmationDialog from "@/components/ConfirmationDialog"
  import {useClientStore} from "@/stores/clients";
  import {onMounted, computed, ref} from 'vue'

  const showDeleteDialog = ref(false)
  const itemToDelete = ref()

  const storeClient = useClientStore()
  const clients = computed(() => {
    return storeClient.getClients
  })

  onMounted(() => {
    storeClient.fetchClients()
  })

  function openDeleteDialog(itemId, itemName) {
    itemToDelete.value = {
      id: itemId,
      title: itemName
    }
    showDeleteDialog.value = true
  }

  function deleteClient() {
    storeClient.deleteClient(itemToDelete.value.id)
    showDeleteDialog.value = false
  }
  </script>
