<template>
  <div>

    <input type="number" v-model="minutes" @change="refresh()">
    <p>{{date2}}</p>
    <p>{{date3}}</p>

    <description-of-variable
        :varName="'millisecondsToMyBirth'"
        :description="'15 * 365 * 86400000 + 30 * 86400000'"
        :variable="millisecondsToMyBirth"
    />
    <description-of-variable
        :varName="'birthDate'"
        :description="'new Date(millisecondsToMyBirth)'"
        :variable="birthDate"
    />
    <description-of-variable
        :varName="'date2'"
        :description="''"
        :variable="date2"
    />
    <description-of-variable
        :varName="'date3'"
        :description="''"
        :variable="date3"
    />


  </div>
</template>

<script setup>
import descriptionOfVariable from '@/components/tests/date/descriptionOfVariable'
import {ref} from 'vue'

const millisecondsToMyBirth = 15 * 365 * 86400000 + 30 * 86400000 + 5 * 60 * 60 * 1000
const thirtyMins = 30 * 60 * 1000
const birthDate = new Date(millisecondsToMyBirth)
const minutes = ref(0)
let date2 = new Date(birthDate)


const date3 = ref(new Date(date2))
function refresh() {
  date2.setMinutes(minutes.value)
  this.date3 = new Date(Math.floor(date2 / thirtyMins) * thirtyMins)
}

</script>

<style scoped>

</style>