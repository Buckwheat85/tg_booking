<template>

  <v-btn
      color="info"
      @click="dialog=true"
  >Добавить клиента
  </v-btn>

  <v-dialog
      v-model="dialog"
      width="300"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Новый клиент</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
            label="Имя клиента*"
            required
            v-model="clientName"
            autofocus
        ></v-text-field>
        <small>*обязательно для заполнения</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            @click="close"
        >
          Отмена
        </v-btn>
        <v-btn
            :disabled="!dataIsCorrect"
            variant="tonal"
            @click="addClientClick()"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {computed, ref, watch} from "vue"
import {useClientStore} from "@/stores/clients"

const storeClient = useClientStore()

const dialog = ref(false)
const clientName = ref('')

function addClientClick() {
  storeClient.addClient(clientName.value)
  close()
}

function close() {
  dialog.value = false
}
watch(dialog, (newValue) => {
  if (newValue == false) {
    clientName.value = ''
  }
})
const dataIsCorrect = computed(() =>
    (clientName.value !== '')
)
</script>

<style scoped>

</style>