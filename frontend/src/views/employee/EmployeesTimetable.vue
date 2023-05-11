<template>
  <v-container>
    <v-row>
      <v-col>
        <shift-choose
            v-model="timeInterval"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <time-table-calendar
            v-if="employees.length && timetable.length"
            :timetable="timetable"
            :employees="employees"
            v-model:newTimeTable="newTimeTable"
        ></time-table-calendar>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col md="4" sm="6">
        <v-btn
            class="my-2"
            block
            :disabled="disabled"
            @click="saveTimetable"
        >Применить изменения
        </v-btn>
        <v-btn
            class="my-2"
            block
            variant="outlined"
            :disabled="disabled"
            @click="clearWorkdays"
        >
          Сделать дни нерабочими
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {ref, computed, onBeforeMount} from 'vue'
import {useTimetableStore} from "@/stores/timetables"
import ShiftChoose from "@/components/ShiftChoose"
import TimeTableCalendar from "@/components/calendar/TimeTableCalendar"

import {useEmployeeStore} from "@/stores/employees";
import {formatDateTimeForSQLQuery} from "@/modules/date_operations";

const storeEmployee = useEmployeeStore()
onBeforeMount(() => {
  storeEmployee.fetchEmployees()
})

const employees = computed(() => {
  return storeEmployee.getEmployeesSorted
})

const timetable = computed(() => {
  return storeTimetable.getTimetable
})

const storeTimetable = useTimetableStore()

const employeeId = ref(null)

const shift1StartHour = 8;
const shift2StartHour = 15;
const shift2EndHour = 21;
const shift1StartTime = new Date().setHours(shift1StartHour, 0)
const shift2StartTime = new Date().setHours(shift2StartHour, 0)
const shift2EndTime = new Date().setHours(shift2EndHour, 0)
const presetRanges = ref([
  {label: 'Первая смена', range: [shift1StartTime, shift2StartTime]},
  {label: 'Вторая смена', range: [shift2StartTime, shift2EndTime]},
])

async function saveTimetable() {

  const timetableToStore = []

  newTimeTable.value.forEach((value, index) => {

    let timeIntervalFrom = new Date(value.date)
    timeIntervalFrom.setHours(timeInterval.value[0].hour, timeInterval.value[0].minute, 0, 0)
    let timeIntervalTo = new Date(value.date)
    timeIntervalTo.setHours(timeInterval.value[1].hour, timeInterval.value[1].minute, 0, 0)

    timetableToStore.push({
      timeFrom: formatDateTimeForSQLQuery(timeIntervalFrom),
      timeTo: formatDateTimeForSQLQuery(timeIntervalTo),
      MasterId: value.masterId
    })
  })

  await storeTimetable.addTimetable(timetableToStore)

  newTimeTable.value = []

}

function clearWorkdays() {

  const timetableToClearDays = []
  newTimeTable.value.forEach((value) => {
    if (value.id) timetableToClearDays.push(value.id)
  })

  storeTimetable.deleteTimetable(timetableToClearDays)
  newTimeTable.value = []
}

onBeforeMount(() => {
  fetchTimetable()
})

function fetchTimetable() {
  storeTimetable.fetchTimetable()
}

const disabled = computed(() => {
  return !newTimeTable.value.length
})

const timeInterval = ref()

const newTimeTable = ref([])
</script>

<style scoped>

</style>