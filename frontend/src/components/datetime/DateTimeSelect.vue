<template>



<!--  <div class="datepicker">-->

<!--    <label>Дата</label>-->
<!--        class="form-control"-->
<!--    <flat-pickr-->
<!--        :modelValue="props.date"-->
<!--        :config="configDate"-->
<!--    />-->

<!--  </div>-->
</template>

<script setup>
import {ref, inject} from 'vue';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import {Russian} from 'flatpickr/dist/l10n/ru.js';

const props = defineProps(['date'])
//можно пропсы объявлять по разному через массив или объект с заданием типа данных
// const props = defineProps({
//   date: Date
// })

const emit = defineEmits(['update:date'])

function onDateChange(selectedDates, dateStr, instance) {
  console.log(selectedDates)
  console.log(dateStr)
  console.log(instance)
}

// Read more at https://flatpickr.js.org/options/
const configDate = ref({
  altInput: true,
  altFormat: "d.M.Y время H:i",
  enableTime: true,
  minuteIncrement: 30,
  minTime: "8:00",
  maxTime: "20:30",
  locale: Russian, // locale for this instance only
  onClose: (selectedDates) => {
    if (selectedDates.length > 0)
      emit('update:date', selectedDates[0])
  },

});
</script>

<style scoped>
.datepicker {
  border: 1px solid #1C6EA4;
  border-radius: 5px;
}
</style>