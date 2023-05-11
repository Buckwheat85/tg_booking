<template>

  <v-container>
    <v-row>
      <v-col>
        <clients-input/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <clients-list/>
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup>
import ClientsList from '@/components/clients/ClientsList'
import ClientsInput from '@/components/clients/ClientsInput'
</script>