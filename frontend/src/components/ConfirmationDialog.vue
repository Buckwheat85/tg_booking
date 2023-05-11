<template>
  <v-dialog
      width="auto"
      :model-value="modelValue"
      persistent
  >
    <v-card>

      <v-card-title>
        <slot name="title">Заголовок</slot>
      </v-card-title>

      <v-card-text class="text-center">
        <slot>Описание</slot>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn @click="close">
          <slot name="cancel-button">Нет</slot>
        </v-btn>
        <v-btn variant="tonal" @click="confirm">
          <slot name="confirm-button">Да</slot>
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'confirm'])


function confirm(){
  emit('confirm')
  close()
}

function close() {
  emit('update:modelValue', false)
}
</script>