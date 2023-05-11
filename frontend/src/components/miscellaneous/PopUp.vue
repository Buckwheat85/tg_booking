<template>

  <div class="wrapper" @click="closePopUp">
    <div class="popup-tg">
      Цвет {{ color }} скопирован
    </div>
  </div>

</template>

<script setup>
import {onMounted} from "vue";

const emit = defineEmits(['update:showPopUp'])
const props = defineProps({
  showPopUp: Boolean,
  color: String,
  timer: Number
})

onMounted(
    () => {
      // если close вызвать как функцию close(), будет выполнена немедленно
      setTimeout(closePopUp, props.timer)
    }
)

function closePopUp() {
  emit('update:showPopUp', false)
}
</script>

<style scoped>

.wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(146, 83, 100, 0.4);
}

.popup-tg {
  opacity: 1;
  position: absolute;
  background-color: #555;
  color: #fff;
  width: 120px;
  left: 50%;
  top: 50%;
  padding: 10px;
  border-radius: 10px;
  animation: fadeIn 1s;
}

/* Popup container */
.popup {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

/* The actual popup (appears on top) */
.popup .popuptext {
  visibility: hidden;
  width: 160px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;
}

/* Popup arrow */
.popup .popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Toggle this class when clicking on the popup container (hide and show the popup) */
.popup .show {
  visibility: visible;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>