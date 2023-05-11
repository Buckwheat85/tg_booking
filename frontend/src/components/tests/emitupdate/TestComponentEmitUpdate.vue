<template>
  <div>
    <label>modelValue</label>
    <input
        type="text"
        :value="modelValue"
        @input='$emit("update:modelValue", $event.target.value)'
    >
    <br>
    <label>childProp</label>
    <input
        type="text"
        :value="childProp"
        @input='$emit("update:childProp", $event.target.value)'
    >
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue', 'update:childProp'])
const props = defineProps({
  modelValue: String,
  childProp: String
})
</script>

<style scoped>

</style>