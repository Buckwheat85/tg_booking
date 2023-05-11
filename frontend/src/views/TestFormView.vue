<template>

  <flask-test/>

<!--  <div>-->
<!--    <div v-if="currTest == 2">-->
<!--      <test-compoenent-dates/>-->
<!--    </div>-->

<!--    <div v-if="currTest == 1">-->
<!--      <test-component-emit-update-->
<!--          v-model:modelValue="emitModelValue"-->
<!--          v-model:childProp="emitChildProp"-->

<!--      />-->
<!--      <p>Parent value of emitModelValue = {{ emitModelValue }}</p>-->
<!--      <p>Parent value of emitChildProp = {{ emitChildProp }}</p>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script setup>
import TestComponentEmitUpdate from '@/components/tests/emitupdate/TestComponentEmitUpdate'
import TestCompoenentDates from '@/components/tests/date/TestCompoenentDates'
import FlaskTest from '@/components/tests/flask-restful-api/flask-test'
import {ref} from 'vue'

const currTest = 2
const emitModelValue = ref('')
const emitChildProp = ref('')
</script>

<style scoped>

</style>