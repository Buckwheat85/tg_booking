<template>

    <div class="d-flex align-items-stretch bd-highlight mb-2">
      <div class="d-flex flex-column bd-highlight col-3">
        <div class="p-2 bd-highlight">{{ varName }}</div>
        <div class="p-2 bd-highlight">{{ description }}</div>
        <div class="p-2 bd-highlight">{{ typeof variable }}</div>
      </div>
      <div class="p-2 flex-grow-1">
        <p class="align-middle">{{ variable }}</p>
      </div>
    </div>


</template>

<script setup>
const props = defineProps(['description', 'variable', 'varName'])
console.log(props.variable.name)
</script>

<style scoped>
.bd-highlight {
    background-color: rgba(86,61,124,0.15);
    border: 1px solid rgba(86,61,124,0.15);
}
</style>