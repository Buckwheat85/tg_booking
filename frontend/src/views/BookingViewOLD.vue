<template>
  <div>
    <h2>Журнал записи клиентов</h2>
    <vue-cal
        class="vuecal--blue-theme"
        active-view="day"
        :disable-views="['years','year','month']"
        locale="ru"
        :time-from="480"
        :time-to="1260"
        :time-step="30"
        :split-days="splitDays"
        sticky-split-labels
        :min-split-width="200"
        :events="events"
        :hide-body="hideBody"
        :time-cell-height="25"
        show-time-in-cells
        @ready="getShedules('ready', $event)"
        @view-change="getShedules('view-change', $event)"
        @cell-click="clickCalendar($event)"

    >
      <template #time-cell="{ hours, minutes }">
        <div :class="{ 'vuecal__time-cell-line': true, hours: !minutes }">
          <strong v-if="!minutes" style="font-size: 15px">{{ hours }}</strong>
          <span v-else style="font-size: 11px">{{ minutes }}</span>
        </div>
      </template>
    </vue-cal>
    <div v-if="hideBody">
      <p>
        В этот день нет работающих сотрудников, <br>
        выберите другой день или измените график работы
      </p>
    </div>

    <new-booking-view
        v-if="showModal"
        @close="showModal = false"
    />

  </div>
</template>

<script>
import ModalBookingView from "@/views/ModalBookingViewOLD"
import NewBookingView from "@/views/NewBookingView"
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import axios from "axios";
import EmployeesSelect from '@/components/employees/EmployeesSelect'
import ClientsSelect from '@/components/clients/ClientsSelect'
import ServiceSelect from '@/components/services/ServicesSelect'

export default {
  name: "BookingView",
  //components: {VueCal, modalBooking},
  components: {VueCal, ModalBookingView, EmployeesSelect, ClientsSelect, ServiceSelect, NewBookingView},
  data() {
    return {
      events: [],
      splitDays: [],
      hideBody: false,
      showModal: false
    }
  },
  mounted() {
    //this.getShedules()
  },
  methods: {
    log: function (){
      console.log('close from BookingView')
    },
    logEvents: function (eventName, event) {
      console.log(eventName)
      console.log(event)
    },
    clickCalendar: function (event) {

      this.logEvents('cell-click', event)
      this.showModal = true
    },
    // closeModal: function () {
    //   this.showModal = false
    // },
    getShedules: function (eventName, event) {
      axios.post("/api/shedules", {
        timeFrom: event.startDate,
        timeTo: event.endDate
      }).then((res) => {

        const splits = JSON.parse(res.data.splits)

        this.hideBody = splits.length == 0

        this.splitDays = splits

        const events = JSON.parse(res.data.events)
        events.forEach(function (entry) {
          entry.start = new Date(entry.start)
          entry.end = new Date(entry.end)
          entry.title = entry.Client.name
          entry.content = entry.Service.name
        })

        this.events = events

      }).catch(() => {
        console.log('ошибка загрузки данных с сервера')
      })
    },
  }
}
</script>

<style>
.cell-time-label:hover {
  color: black;
  opacity: 1;
  font-size: 1em;
}
</style>