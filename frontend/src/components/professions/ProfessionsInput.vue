<template>

  <v-btn
      color="info"
      @click="dialog=true"
  >Добавить должность
  </v-btn>

  <v-dialog
      v-model="dialog"
      width="300"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Новая должность</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
            label="Наименование должности*"
            required
            v-model="profName"
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
            @click="addProfessionClick()"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {computed, ref, watch} from "vue"
import {useProfessionStore} from "@/stores/professions"

const dialog = ref(false)
const profName = ref('')

const storeProfession = useProfessionStore()

const dataIsCorrect = computed(() =>
    profName.value !== ''
)

const addProfessionClick = function () {
  storeProfession.addProfession(this.profName)
  close()
}

watch(dialog, (newValue) => {
  if (newValue == false) {
    profName.value = ''
  }
})

function close() {
  dialog.value = false
}
</script>