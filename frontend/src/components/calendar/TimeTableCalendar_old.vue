<template>

  <div>
    <div class="change-period-btn" @click="monthChange(-1)">
      &lt; --
    </div>
    {{ currPeriod.year + " " + currPeriod.month }}
    <div class="change-period-btn" @click="monthChange(1)">
      -- &gt;
    </div>
  </div>
  <div style="overflow-x:auto;">
    <input type="text" v-model="someText">
    <table>


      <thead>
      <tr>
        <th class="th-cell">

        </th>
        <th class="th-cell" v-for="day in days">
          {{ day }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="str in timetableData">
        <th class="th-employee">
          {{ str.empName }}
        </th>

        <td
            v-for="date in str.dates"
            class="td-cell"
            :class="{ selected: date.selected }"
            @click="toggleCell(date)"
        >

        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {computed, onBeforeMount, reactive, ref, watch} from "vue";

const employees = [
  {
    name: 'Аргутов',
    id: 1
  },
  {
    name: 'Зиборова',
    id: 2
  },
  {
    name: 'Малютченко',
    id: 3
  },
  {
    name: 'Закарьян',
    id: 4
  }
]

const someText = ref('')
const currPeriod = ref({})
const daysInMonth = ref(0)
const days = ref([])
const empDates = ref([])
const timetableData = ref({})

class EmployeeMonthTimetable {
  constructor(empName, empId, empDates) {
    this.empName = empName
    this.empId = empId

    const arr = []
    empDates.forEach((val) => {
      arr.push({
        day: val.day, selected: val.selected
      })
    })
    this.dates = arr
  }
}

watch(currPeriod, () => {

      //days in month
      daysInMonth.value = new Date(currPeriod.value.year, currPeriod.value.month, 0).getDate()

      //days
      days.value = []
      for (let i = 1; i <= daysInMonth.value; i++) {
        days.value.push(i)
      }

      //empDates
      empDates.value = []
      for (let i = 1; i <= daysInMonth.value; i++) {
        empDates.value.push(
            {
              day: i,
              selected: false
            }
        )
      }

      //timetableData
      timetableData.value = []
      employees.forEach((employee) => {
        timetableData.value.push(new EmployeeMonthTimetable(employee.name, employee.id, empDates.value))
      })
    },
    {deep: true}
)

onBeforeMount(() => {
  currPeriod.value = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  }
})

function toggleCell(cellDate) {
  cellDate.selected = !cellDate.selected
}

function monthChange(i) {
  currPeriod.value.month += i
  if (currPeriod.value.month == 0 || currPeriod.value.month == 13) {
    currPeriod.value.month = (currPeriod.value.month == 0 ? 12 : 1)
    currPeriod.value.year += i
  }
}
</script>

<style scoped>
.selected {
  background-color: white !important;
  color: black !important;
}

.header-row, .data-row {
  display: flex;
}

.data-col {
  display: flex;
  flex-direction: column;
}

.first-cell, .employee-name {
  width: 100px;
  height: 50px;
  background-color: #6161A4;
  display: flex;
  justify-content: center;
  align-items: center;
  border: black solid thin;
}

.header-date {
  width: 50px;
  height: 50px;
  background-color: #6161A4;
  display: flex;
  justify-content: center;
  align-items: center;
  border: black solid thin;
}

.th-cell, .td-cell, .th-employee {
  padding: 5px;
  min-width: 50px;
  background-color: #6161A4;
}

.td-cell:hover {
  background-color: #42b983;
}

tr {
  height: 50px;
}

.change-period-btn {
  background-color: #6161A4;
  display: inline;
  cursor: pointer;
  margin: 5px 5px 100px 5px;
  padding: 5px;
}
</style>