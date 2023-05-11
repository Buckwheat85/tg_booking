<template>

  <v-btn
      color="info"
      @click="dialog=true"
  >Добавить услугу
  </v-btn>

  <v-dialog
      v-model="dialog"
      width="300"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Новая услуга</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
            label="Наименование услуги*"
            required
            v-model="serviceName"
            autofocus
        ></v-text-field>

      </v-card-text>
      <v-card-item>

        <professions-select
            v-model="profId"
        />

      </v-card-item>
      <v-card-text>
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
            @click="addServiceClick"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup>
import {ref, computed, watch} from "vue";
import ProfessionsSelect from "@/components/professions/ProfessionsSelect"
import {useServiceStore} from "@/stores/services";

const serviceStore = useServiceStore()

const profId = ref(null)

const dialog = ref(false)
const serviceName = ref('')

const dataIsCorrect = computed(() =>
    (serviceName.value !== '') && (profId.value !== null)
)

function addServiceClick() {
  serviceStore.addService(serviceName.value, profId.value)
  close()
}

function close() {
  dialog.value = false
}

watch(dialog, (newValue) => {
  if (newValue == false) {
    serviceName.value = ''
  }
})
</script>

<style scoped>

</style>