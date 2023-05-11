<template>

  <v-dialog
      :model-value="dialog"
      @update:model-value="false"
  ></v-dialog>

<!--  <v-dialog-->
<!--      width="500"-->
<!--      v-model="dialog"-->

<!--  >-->
<!--    <v-card>-->
<!--      <v-card-item>-->
<!--        <employees-select-->
<!--            v-model="employeeId"-->
<!--        />-->
<!--      </v-card-item>-->

<!--      <v-btn-->
<!--          @click.prevent="close"-->
<!--      >Отмена-->
<!--      </v-btn>-->
<!--    </v-card>-->
<!--  </v-dialog>-->

  <!--  <modal-form-view-->
  <!--      @saveBtnClick="saveNewEvent()"-->
  <!--  >-->
  <!--    <template v-slot:header>-->
  <!--      <h3>Добавление записи</h3>-->
  <!--    </template>-->

  <!--    <template v-slot:body>-->
  <!--      <employees-select-->
  <!--          v-model:selectedid="employeeid"-->
  <!--      />-->
  <!--      <services-select-->
  <!--          v-model:selectedid="serviceid"-->
  <!--          class="mt-3"-->
  <!--      />-->
  <!--      <clients-select-->
  <!--          v-model:selectedid="clientid"-->
  <!--      />-->
  <!--      <date-time-select-->
  <!--          v-model:date="dateSelected"-->
  <!--          class="mb-3"-->
  <!--      />-->
  <!--    </template>-->

  <!--  </modal-form-view>-->

</template>

<script setup>
import ModalFormView from "@/views/ModalFormView";
import EmployeesSelect from "@/components/employees/EmployeesSelect"
import ClientsSelect from "@/components/clients/ClientsSelect"
import ServicesSelect from "@/components/services/ServicesSelect"
import DateTimeSelect from "@/components/datetime/DateTimeSelect"
import {computed, inject, ref, watch} from 'vue'
import {useWorkShedulesStore} from "@/stores/workshedules";

const props = defineProps(['dialog', 'employeeId'])

const emit = defineEmits(['refresh-vue-cal', 'update:dialog'])
const storeWorkShedules = useWorkShedulesStore()
// const employeeid = inject('selectedEmployeeid', 0)
const dateSelected = inject('defaultDate', 'today')

const clientid = ref(0)
const serviceid = ref(0)


function saveNewEvent() {
  const timeFrom = dateSelected.value
  const timeTo = new Date(timeFrom)
  timeTo.setHours(timeTo.getHours() + 1) //plus 1 hour

  const data = {
    Employeeid: employeeid.value,
    Serviceid: serviceid.value,
    Clientid: clientid.value,
    timeFrom: timeFrom,
    timeTo: timeTo
  }

  storeWorkShedules.addBooking(data)

  emit('refresh-vue-cal')


}


const dialog = ref(false)
watch(() => props.dialog, (value) => {
  console.log('watch props.dialog')
  dialog.value = value
})

// const employeeId = ref(0)
// watch(() => props.employeeId, (value) => {
//   console.log('watch props.employeeId')
//   employeeId.value = value
// })

function close() {
  console.log('func close')
  dialog.value = false
}

watch(dialog, (value) => {
  console.log('watch dialog')
  if (value == false) {
    emit('update:dialog')
  }
})
</script>

<style scoped>

</style>