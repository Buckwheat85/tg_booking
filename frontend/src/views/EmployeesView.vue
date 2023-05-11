<template>

  <v-container>
    <v-row>
      <v-col>
        <employees-input/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <employees-list/>
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup>
import EmployeesInput from "@/components/employees/EmployeesInput"
import EmployeesList from "@/components/employees/EmployeesList"
</script>