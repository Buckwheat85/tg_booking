<template>

  <v-card>
    <v-btn @click="apiTest">API Test</v-btn>
  </v-card>

  <v-card>
    <v-btn @click="dates"></v-btn>
    <p>{{myDate}}</p>
  </v-card>
  <v-card width="500">
    <v-btn
        @click="btnClick"
    >Запрос к питоше
    </v-btn>
    <v-card-item>Ответ сервера = {{ serverResponse }}</v-card-item>

    <v-btn @click="getBookingTable">Получить таблицу букинга</v-btn>
    <v-btn @click="getSplits">Получить splits</v-btn>

    <v-btn @click="getClients">Получить клиентов</v-btn>
  </v-card>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        Клиент
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="item in clients"
        :key="item.id"
    >
      <td>{{ item.name }}</td>
    </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import {ref} from "vue"
import axios from "axios"
import { formatDateLikeISO } from "@/modules/date_operations.js"
import { formatDateTimeForSQLQuery } from "@/modules/date_operations.js"

const myDate = ref('')

function dates(){
  const d = new Date()
  myDate.value = formatDateTimeForSQLQuery(d)
}

function apiTest(){
  axios.get('http://127.0.0.1:3001/api/test').then((res)=>{
    console.log(res)
  })
}

const serverResponse = ref("")
const clients = ref([])

function btnClick() {
  getHello()
}

async function getHello() {
  axios.get("http://127.0.0.1:3001/api/hello").then((res) => {
    console.log(res)
    serverResponse.value = res.data
  }).catch((err) => {
    console.error(err)
  })
}

function getClients() {
  axios.get("http://127.0.0.1:3001/api/clients").then((res) => {
    clients.value = res.data

  }).catch((err) => {
    console.error(err)
  })
}

function getBookingTable() {
  // axios.get("http://127.0.0.1:3001/api/booking").then((res)=>{
  axios.get("http://127.0.0.1:3001/api/booking/2023-04-04 00:00:00/2023-04-05 23:59:59").then((res)=>{
    console.log(res.data)
  }).catch((err)=>{
    console.error(err)
  })
}

function getSplits(){
  const d = formatDateLikeISO(new Date())

  axios.get(`http://127.0.0.1:3001/api/splits/${d}`).then((res)=>{
    console.log(res.data)
  }).catch((err)=>{
    console.error(err)
  })
}
</script>

<style scoped>

</style>