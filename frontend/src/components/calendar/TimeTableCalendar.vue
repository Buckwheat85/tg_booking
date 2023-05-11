<template>

  <div class="period-container">
    <div class="change-period-btn" @click="monthChange(-1)">
      <v-icon icon="mdi-chevron-left"></v-icon>
    </div>
    <p class="period-name">{{ getMonthYearName(currMonth) }}</p>
    <div class="change-period-btn" @click="monthChange(1)">
      <v-icon icon="mdi-chevron-right"></v-icon>
    </div>
  </div>
  <div style="overflow-x:auto;">

    <table>
      <thead>
      <tr>
        <th class="th-cell sticky-col">

        </th>
        <th
            v-for="el in dates"
            class="th-cell"
            :class="{ 'th-weekend': isWeekend(el.date) }"
        >
          {{ el.day }} <br>
          {{ getWeekDayName(el.date) }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="str in timetableData">
        <th class="th-employee sticky-col">
          {{ str.empName }}
        </th>

        <td
            v-for="date in str.dates"
            class="td-cell"
            :class="{ selected: date.selected }"
            @click="toggleCell(date, str.empId, date.id)"
        >
          <div v-if="date.timeFrom" class="work-time">
            {{ dateToHourMinute(date.timeFrom) }}
            <br>
            {{ dateToHourMinute(date.timeTo) }}
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {ref, watch, computed} from "vue";
import {
  dateToHourMinute, getNumberOfDaysInMonth, getStartMonth,
  getWeekDayName, getMonthYearName, isWeekend
} from "@/modules/date_operations"
import {options} from "axios";

const props = defineProps(['timetable', 'employees', 'newTimeTable', 'employeesUpdated'])
const emit = defineEmits(['update:newTimeTable'])

const selectedDays = ref([])
const currMonth = ref(getStartMonth())
const dates = ref([])
const timetableData = ref({})

class EmployeeMonthTimetable {
  constructor(empName, empId, empDates) {
    this.empName = empName
    this.empId = empId

    const arr = []
    empDates.forEach((val) => {
      arr.push({
        day: val.day,
        date: val.date,
        selected: false,
        timeFrom: val.timeFrom,
        timeTo: val.timeTo,
        id: val.id
      })
    })
    this.dates = arr
  }
}

//без этого не очищался массив selectedDays и восстанавливал props.newTimeTable после очистки в родителе
watch(() => props.newTimeTable, () => {
  if (props.newTimeTable.length == 0) {
    selectedDays.value = []
  }
})

watch([currMonth, () => props.timetable], () => {
      const daysCountCurrMonth = getNumberOfDaysInMonth(currMonth.value)

      //dates
      dates.value = []
      for (let i = 1; i <= daysCountCurrMonth; i++) {
        let d = new Date(currMonth.value)
        d.setDate(i)
        dates.value.push(
            {
              day: i,
              date: d,
              weekDay: d.getDay()
            }
        )
      }

      //timetableData
      timetableData.value = []
      props.employees.forEach((employee) => {
        const empDates = fulfillMasterDates(employee.id)
        timetableData.value.push(new EmployeeMonthTimetable(employee.name, employee.id, empDates))
      })
    },
    {
      immediate: true,
      deep: true
    }
)

function toggleCell(cellDate, empId, timetableId) {
  cellDate.selected = !cellDate.selected

  if (cellDate.selected) {
    selectedDays.value.push({
      masterId: empId,
      date: cellDate.date,
      id: timetableId
    })
    emit('update:newTimeTable', selectedDays.value)
  } else {

    selectedDays.value.some((value, index) => {
      if (value.masterId == empId && value.date.getTime() == cellDate.date.getTime()) {
        selectedDays.value.splice(index, 1)
        return true
      }
    })
  }
}

function monthChange(i) {
  //если не использовать промежуточную переменную d,
  //а сразу выполнить setMonth для currMonth.value
  //не сработает watch и даже deep не поможет

  let d = new Date(currMonth.value)
  d.setMonth(d.getMonth() + i)

  currMonth.value = d
}

function fulfillMasterDates(empId) {
  const arr = dates.value.slice()
  let timeFrom, timeTo, timetableId
  const arrMasterTimetable = props.timetable.filter((val) => val.MasterId == empId)
  arr.forEach((elDate) => {
    arrMasterTimetable.some((elTimetable) => {
      timeFrom = ''
      timeTo = ''
      timetableId = ''
      let timeFromDay = new Date(elTimetable.timeFrom)
      timeFromDay.setHours(0, 0, 0, 0)
      if (timeFromDay.getTime() == elDate.date.getTime()) {
        timeFrom = new Date(elTimetable.timeFrom)
        timeTo = new Date(elTimetable.timeTo)
        timetableId = elTimetable.id
        return true
      }
    })
    elDate.timeFrom = timeFrom
    elDate.timeTo = timeTo
    elDate.id = timetableId
  })

  return arr
}
</script>

<style scoped>
.th-weekend {
  color: darkred !important;
}

.td-cell:hover {
  background-color: #80DEEA !important; /*cyan 200 material design*/
}

.selected {
  background-color: #00838F !important;
}

.th-cell, .td-cell, .th-employee, .change-period-btn, .period-name {
  background-color: #00BCD4; /*cyan 500 material design*/
  color: black;
}

.th-cell, .td-cell, .th-employee {
  padding-left: 5px;
  padding-right: 5px;
  min-width: 50px;
}

.td-cell {
  font-size: 14px;
  text-align: center;
}

tr {
  height: 50px;
}

.period-container {
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: stretch;
  margin-bottom: 10px;
}

.change-period-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
}

.period-name {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 5px;
  padding-right: 5px;
  width: 130px;
}

.sticky-col {
  position: sticky;
  left: 0px;
}

/*начало чтоб при прокрутке таблицы не смещалась первая колонка и была отделена от последующих колонок*/
table {
  border-collapse: separate;
  border-spacing: 0;
}

th, td {
  border: black solid thin;
}

/*конец чтоб при прокрутке таблицы не смещалась первая колонка и была отделена от последующих колонок*/

.work-time {
  cursor: default;
}
</style>