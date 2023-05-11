<template>

  <v-container>

    <v-row>
      <v-col>
        <v-card width="258" class="mx-auto">
          <employees-select
              v-model="employeeId"
          />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <datepicker
            class="datepicker"
            v-model="date"
            inline
            multi-dates
            auto-apply
            :highlight="highlightedDates"
            :enableTimePicker=false
            :dark="theme.global.current.value.dark"
        >
        </datepicker>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
            class="text-center mx-auto"
            width="258"
            variant="outlined" title="Время работы">
          <v-card-actions class="justify-center">
            <v-btn-toggle
              v-model="shift"
              rounded="0"
              color="deep-purple-accent-3"
              group
            >
              <v-btn value="1">
                Первая<br/>смена
              </v-btn>

              <v-btn value="2">
                Вторая<br/>смена
              </v-btn>
            </v-btn-toggle>
          </v-card-actions>

          <v-card-actions>
            <v-select
                class="mx-2"
                v-model="shiftFrom"
                :eager="true"
                density="compact"
                :items="workTimeArray"
                label="Начало смены"
            ></v-select>

            <v-select
                class="mx-2"
                v-model="shiftTo"
                :eager="true"
                density="compact"
                :items="workTimeArray"
                label="Конец смены"
            ></v-select>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card
            width="258"
            variant="plain"
            class="text-center mx-auto"
        >
          <v-card-actions class="justify-center">
            <v-btn

                variant="elevated"
                :disabled="disabled"
                @click="saveTimetable"
            >Сохранить
            </v-btn>
          </v-card-actions>
          <v-card-text v-if="disabled">*выбрать сотрудника и дату</v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>

</template>

<script setup>
import {useTheme} from "vuetify";
import EmployeesSelect from "@/components/employees/EmployeesSelect"
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import {watch, watchEffect, ref, onMounted, computed} from 'vue'
import {useTimetableStore} from "@/stores/timetables";

const theme = useTheme()

const timetable = computed(() => {
  return storeTimetable.getTimetable
})

const highlightedDates = ref([])

const storeTimetable = useTimetableStore()

const employeeId = ref(null)

const shift1StartHour = 8;
const shift2StartHour = 15;
const shift2EndHour = 21;
const date = ref([])
const time = ref([
  {hours: shift1StartHour, minutes: 0, seconds: 0},
  {hours: shift2StartHour, minutes: 0, seconds: 0}
])
const shift1StartTime = new Date().setHours(shift1StartHour, 0)
const shift2StartTime = new Date().setHours(shift2StartHour, 0)
const shift2EndTime = new Date().setHours(shift2EndHour, 0)
const presetRanges = ref([
  {label: 'Первая смена', range: [shift1StartTime, shift2StartTime]},
  {label: 'Вторая смена', range: [shift2StartTime, shift2EndTime]},
])
const minTime = {hours: shift1StartHour}
const maxTime = {hours: shift2EndHour}

function saveTimetable() {
  const currShiftStartTimeHour = time.value[0].hours
  const currShiftStartTimeMinute = time.value[0].minutes
  const currShiftEndTimeHour = time.value[1].hours
  const currShiftEndTimeHourMinute = time.value[1].minutes

  const newTimetable = []

  date.value.forEach((value, index) => {

    const timeFrom = value.setHours(currShiftStartTimeHour, currShiftStartTimeMinute)
    const timeTo = value.setHours(currShiftEndTimeHour, currShiftEndTimeHourMinute)
    newTimetable.push({
      timeFrom,
      timeTo,
      MasterId: employeeId.value,
    })
  })

  storeTimetable.addTimetable(newTimetable)

  date.value = []

  fetchTimetable()

  updateHLDates()

}

onMounted(() => {
  fetchTimetable()
})

function fetchTimetable() {
  storeTimetable.fetchTimetable()
}

function updateHLDates() {
  highlightedDates.value = []

  timetable.value.forEach((value) => {
    if (value.MasterId == employeeId.value)
      highlightedDates.value.push(value.timeFrom)
  })
}

watch(employeeId, () => {
  updateHLDates()
})

const workTimeArray = computed(() => {
  const arr = []
  for (let h = 8; h < 21; h++) {
    for (let m = 0; m < 60; m += 30) {
      const obj = {
        title: (h < 10 ? `0${h}` : h) + ':' + (m < 10 ? `0${m}` : m),
        value: h + ':' + m,
        hour: h,
        minute: m,
      }
      arr.push(obj)
    }
  }
  return arr
})

const shiftFrom = ref()
const shiftTo = ref()

const disabled = computed(() => {
  return date.value.length == 0 || employeeId.value == null
})

const shift = ref('1')
</script>

<style scoped>
.datepicker {
  justify-content: center;
}
</style>