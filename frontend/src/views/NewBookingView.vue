<template>
  <v-dialog
      v-model="dialog"
      width="500"
  >
    <v-card>
      <v-card-title>{{ cardTitle }}</v-card-title>

      <v-card-item>
        <employees-select v-model="employeeId"/>
        <services-select v-model="serviceId"/>
        <clients-select v-model="clientId"/>
      </v-card-item>

      <v-card-item>
        <template #title>
          {{ bookingDateTime.toLocaleDateString() }}
        </template>
        <v-row>
          <v-col cols="6">
            <v-select
                v-model="timeStart"
                :return-object="true"
                :items="workTimeArray"
                label="Время записи"
                @update:modelValue="changeBookingDateTime"
            />
          </v-col>
          <v-col cols="6">
            <v-select
                v-model="duration"
                :return-object="true"
                :items="durationItems"

                label="Длительность"
            />
          </v-col>
        </v-row>

      </v-card-item>
      <v-divider/>
      <v-card-actions>
        <v-btn @click="close">Закрыть</v-btn>
        <v-spacer/>
        <v-btn v-if="eventId" @click="openDeleteDialog">Отменить запись</v-btn>
        <v-btn :disabled="disableSaveBtn" @click="saveBtnClick">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <confirmation-dialog
      v-model="showDeleteDialog"
      @confirm="cancelEvent"
  >
    <template #title>Подтвердите отмену записи</template>
    <template #default>
      <div></div>
    </template>
    <template #cancel-button>Закрыть</template>
    <template #confirm-button>Отменить запись</template>
  </confirmation-dialog>
</template>

<script setup>
import {computed, ref, watch} from "vue"
import EmployeesSelect from "@/components/employees/EmployeesSelect"
import ServicesSelect from "@/components/services/ServicesSelect"
import ClientsSelect from "@/components/clients/ClientsSelect"
import ConfirmationDialog from "@/components/ConfirmationDialog"

import { formatDateTimeForSQLQuery } from "@/modules/date_operations"

import {useWorkShedulesStore} from "@/stores/workshedules"

const storeWorkShedules = useWorkShedulesStore()

const props = defineProps(['dialog', 'employeeId', 'selectedDateTime', 'eventEdit', 'event'])
const emit = defineEmits(['update:dialog', 'refresh-vue-cal', 'update:event'])

const bookingDateTime = ref(undefined)
const timeStart = ref(undefined)
const duration = ref({title: 1, value: 60})

const workTimeArray = computed(() => {
  const arr = []
  for (let h = 8; h < 22; h++) {
    for (let m = 0; h == 21 ? m < 30 : m < 60; m += 30) {
      const obj = {
        title: (h < 10 ? `0${h}` : h) + ':' + (m < 10 ? `0${m}` : m),
        hour: h,
        minute: m,
      }
      arr.push(obj)
    }
  }
  return arr
})

// const durationItems = [0.5, 1, 1.5, 2, 2.5, 3, 3.5]
const durationItems = [
  {title: 0.5, value: 30},
  {title: 1, value: 60},
  {title: 1.5, value: 90},
  {title: 2, value: 120},
  {title: 2.5, value: 150},
  {title: 3, value: 180},
  {title: 3.5, value: 210},
  {title: 4, value: 240},
]

const serviceId = ref(null)
const clientId = ref(null)
const eventId = ref(0)
const showDeleteDialog = ref(false)

const employeeId = ref(null)
watch(() => props.employeeId, (newValue) => {
  employeeId.value = newValue
})

const dialog = ref(false)
watch(() => props.dialog, (newValue) => {
  dialog.value = newValue
})
watch(dialog, (newValue) => {
  if (newValue == false) {
    close()
  }
})

watch(() => props.selectedDateTime, (newValue) => {
  if (newValue) {
    setTimeStart(newValue)
  }
})

watch(() => props.event, (event) => {
  if (event) {
    setTimeStart(event.start)
    eventId.value = event.id
    employeeId.value = event.masterId
    serviceId.value = event.serviceId
    clientId.value = event.clientId
    duration.value = durationItems.find((durObj) => {
      return durObj.value == event.endTimeMinutes - event.startTimeMinutes
    })
  }
})

function setTimeStart(dateTime) {
  bookingDateTime.value = dateTime
  const h = dateTime.getHours()
  const m = dateTime.getMinutes()
  workTimeArray.value.some((value) => {
    if (value.hour == h && value.minute == m)
      timeStart.value = value
  })
}

const disableSaveBtn = computed(() => {
  return !(employeeId.value && serviceId.value && clientId.value)
})

function changeBookingDateTime(newValue) {
  bookingDateTime.value.setHours(newValue.hour, newValue.minute, 0, 0)
}

function close() {
  //employeeId.value = null этого не надо делать, иначе при повторном клике по тому же сотруднику, поле будет пустым
  eventId.value = 0
  serviceId.value = null
  clientId.value = null
  duration.value = durationItems.find((durObj) => {
    return durObj.value == 60
  })
  emit('update:event', null)
  emit('update:dialog', false)
}

function saveBtnClick() {
  if (eventId.value) {
    editEvent()
  } else {
    saveEvent()
  }
}

async function saveEvent() {
  await storeWorkShedules.addBooking(getDataToSaveEvent())
  emit('refresh-vue-cal')
  close()
}

async function cancelEvent() {
  await storeWorkShedules.deleteBooking(eventId.value)
  showDeleteDialog.value = false
  emit('refresh-vue-cal')
  close()
}

async function editEvent() {
  await storeWorkShedules.editBooking(getDataToSaveEvent())
  emit('refresh-vue-cal')
  close()
}

function getDataToSaveEvent(){
  let timeFrom = formatDateTimeForSQLQuery(bookingDateTime.value)
  let timeTo = new Date(bookingDateTime.value)
  timeTo.setMinutes(bookingDateTime.value.getMinutes() + duration.value.value)
  timeTo = formatDateTimeForSQLQuery(timeTo)

  const data = {
    employeeId: employeeId.value,
    serviceId: serviceId.value,
    clientId: clientId.value,
    timeFrom: timeFrom,
    timeTo: timeTo
  }

  if (eventId.value){
    data.eventId = eventId.value
  }

  return data
}

function openDeleteDialog(itemId, itemName) {
  showDeleteDialog.value = true
}

const cardTitle = computed(() => {
  if (eventId.value) {
    return "Изменение записи"
  } else {
    return "Запись на услугу"
  }
})

</script>