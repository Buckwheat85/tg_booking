<template>

  <v-container>
    <v-row>
      <v-col>
        <services-input/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <services-list/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ServicesList from "@/components/services/ServicesList";
import ServicesInput from "@/components/services/ServicesInput";
</script>

<style scoped>

</style>