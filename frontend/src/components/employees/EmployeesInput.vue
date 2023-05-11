<template>

  <v-btn
      color="info"
      @click="dialog=true"
  >Добавить сотрудника
  </v-btn>

  <v-dialog
      transition="fab-transition"
      v-model="dialog"
      persistent
      width="300"
  >

    <v-card>
      <v-card-title>
        <span class="text-h5">Новый сотрудник</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
            label="Имя сотрудника*"
            required
            v-model="employeeName"
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
        <v-btn @click="close">
          Отмена
        </v-btn>

        <v-btn
            :disabled="!dataIsCorrect"
            variant="tonal"
            @click="addEmployeeClick"
        >Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup>
import {ref, computed, watch} from "vue"
import ProfessionsSelect from "@/components/professions/ProfessionsSelect"
import {useEmployeeStore} from "@/stores/employees"

const dialog = ref(false)

const employeeStore = useEmployeeStore()

const employeeName = ref("")
const profId = ref(null)

const dataIsCorrect = computed(() =>
    (profId.value !== null) && (employeeName.value !== '')
)

function addEmployeeClick() {
  employeeStore.addEmployee(employeeName.value, profId.value)
  dialog.value = false
}

function close() {
  dialog.value = false
}

watch(dialog, (newValue) => {
  if (newValue == false) {
    employeeName.value = ''
    profId.value = null
  }
})
</script>