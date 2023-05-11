<template>
  <v-container>
    <vue-cal
        locale="ru"
        sticky-split-labels
        hide-view-selector
        active-view="day"
        :disable-views="['years', 'year', 'month', 'week']"
        show-time-in-cells
        :time-cell-height="25"
        :time-from="480"
        :time-to="1260"
        :time-step="30"
        :hide-body="hideBody"
        :events="events"
        :split-days="splitDays"
        :selected-date="selectedDateModel"
        @ready="dateChange($event)"
        @view-change="dateChange($event)"
        @cell-click="clickCalendar($event)"
        :on-event-click="clickEvent"
        today-button
    >
      <template #today-button>
        <v-tooltip text="Сегодня">
          <template #activator="{ props }">
            <v-btn>
              <v-icon :="props" icon="mdi-calendar-today"></v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </template>
      <template #event="{ event, view }">
        <p v-if="event.offtime"></p>
      </template>
    </vue-cal>
  </v-container>

  <new-booking-view
      v-model:dialog="dialogNewBooking"
      :employeeId="selectedEmployeeId"
      :professionId="selectedEmployeeProfessionId"
      :selectedDateTime="selectedDateTime"
      @refresh-vue-cal="fetchEvents(timeFrom, timeTo)"
      :eventEdit="false"
      v-model:event="selectedEvent"
  />

</template>

<script setup>
import NewBookingView from "@/views/NewBookingView"
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import {ref, provide, inject, computed, onMounted, onBeforeMount} from "vue";
import {useWorkShedulesStore} from "@/stores/workshedules"
import {useTimetableStore} from "@/stores/timetables"

import {useMiscStore} from "@/stores/miscellaneous"

const storeMisc = useMiscStore()

const selectedDateModel = ref(new Date())

const showBookingForm = ref(false)
const dialogNewBooking = ref(false)
const selectedEmployeeId = ref(null)
const selectedEmployeeProfessionId = ref(0)
const selectedDateTime = ref('')
const selectedEvent = ref(null)

const timeFrom = ref('')
const timeTo = ref('')

const storeWorkShedules = useWorkShedulesStore()
// const splitDays = computed(() => {
//   return storeWorkShedules.getSplits
// })
const storeTimetable = useTimetableStore()
const splitDays = computed(() => {
  return storeTimetable.getSplitDays
})
const events = computed(() => {
  const evts = storeWorkShedules.getEvents
  addDayOffEvents(evts)

  return evts
})
const hideBody = computed(() => {
  return splitDays.value.length == 0
})

provide('showModal', showBookingForm)
// provide('selectedEmployeeid', selectedEmployeeId)
// provide('defaultDate', selectedDate)

onBeforeMount(() => {
  selectedDateModel.value = storeMisc.lastCalendarDate
  // selectedDateModel.value = storeMisc.getLastCalendarDate
})

function clickCalendar(data) {
  selectedEmployeeId.value = data.split
  selectedEmployeeProfessionId.value = splitDays.value.find(el => el.id == data.split).professionId
  const thirtyMins = 30 * 60 * 1000 //30 минут
  selectedDateTime.value = new Date(Math.floor(data.date / thirtyMins) * thirtyMins) //окргуглили до 30 минут в меньшую сторону
  dialogNewBooking.value = true
}

function dateChange(data) {
  storeMisc.setLastCalendarDate(data.startDate)
  this.timeFrom = data.startDate
  this.timeTo = data.endDate
  fetchEvents(this.timeFrom, this.timeTo)
}

async function fetchEvents(timeFrom, timeTo) {
  //если выполенить без awaita, часто происходит следующий запрос к бд через mysql connector
  // выдает ошибку, т.к. текущий запрос еще не выполнен
  // наверное следует объединить запросы в один, иначе наблюдается залипание при перелистывании дней в журнале записи
  let a = await storeTimetable.fetchSplitDays(timeFrom)

  let b = await storeWorkShedules.fetchWorkShedules(timeFrom, timeTo);
}

function clickEvent(event, e) {
  if (event.offtime) {
    return
  } else {
    // selectedEmployeeId.value = data.split
    // const thirtyMins = 30 * 60 * 1000 //30 минут
    // selectedDateTime.value = new Date(Math.floor(data.date / thirtyMins) * thirtyMins) //окргуглили до 30 минут в меньшую сторону

    selectedEvent.value = event
    dialogNewBooking.value = true
  }


}

function addDayOffEvents(evts) {

  splitDays.value.forEach((split) => {
    // const shiftStart = new Date(split.Timetables[0].timeFrom)
    // const shiftEnd = new Date(split.Timetables[0].timeTo)
    const shiftStart = new Date(split.timeFrom)
    const shiftEnd = new Date(split.timeTo)
    const dayStart = new Date(shiftStart)
    dayStart.setHours(8, 0, 0, 0)
    const dayEnd = new Date(shiftStart)
    dayEnd.setHours(21, 0, 0, 0)

    const offTime = []

    if (dayStart.getTime() != shiftStart.getTime()) {
      offTime.push({
        start: dayStart,
        end: shiftStart,
        split: split.id,
        background: true,
        class: "offtime",
        offtime: true
      })
    }

    if (dayEnd.getTime() != shiftEnd.getTime()) {
      offTime.push({
        start: shiftEnd,
        end: dayEnd,
        split: split.id,
        background: true,
        class: "offtime",
        offtime: true
      })
    }

    evts.push(...offTime)
  })
}

</script>

<style>
.cell-time-label:hover {
  color: black;
  opacity: 1;
  background-color: aqua;
}

.vuecal__event {
  cursor: pointer;
}

.vuecal__event.offtime {
  cursor: default;
  background: /*#fff7f0*/ repeating-linear-gradient(
      -45deg,
      rgba(255, 162, 87, 0.25),
      rgba(255, 162, 87, 0.25) 5px,
      rgba(255, 255, 255, 0) 5px,
      rgba(255, 255, 255, 0) 15px
  );
  /*color: #f6984c;*/
}

.vuecal__event {
  border: 1px solid grey;
}

.vuecal__event.leisure {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}
</style>