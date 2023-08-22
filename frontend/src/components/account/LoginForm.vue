<template>
    <v-dialog 
    :model-value="dialog"
    width="300">
        <v-card>
            <v-card-title>
                <span class="text-h5">Вход в систему</span>
            </v-card-title>
            <v-card-text>
                <v-text-field label="Логин" required v-model="userName" autofocus></v-text-field>
                <v-text-field label="Пароль" required v-model="userPass" autofocus></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn :disabled="!dataIsCorrect" variant="tonal" @click="login()">
                    ОК
                </v-btn>
                <v-btn @click="close">
                    Отмена
                </v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'
defineProps(['dialog'])
const emit = defineEmits(['update:dialog'])

const userName = ref('')
const userPass = ref('')

function login() {

    const success = true
    if (success) {
        emit('update:dialog', false)
    }
      
}

function close() {
    emit('update:dialog', false)
}

const dataIsCorrect = computed(() =>
    (userName.value !== '' && userPass.value !== '')
)
</script>