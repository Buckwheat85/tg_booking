<template>

  <v-container>
    <v-row>
      <v-col>
        <ProfessionsInput/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ProfessionsList/>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import ProfessionsList from "@/components/professions/ProfessionsList";
import ProfessionsInput from "@/components/professions/ProfessionsInput";

export default {
  name: "ProfessionsView",
  components: {
    ProfessionsList,
    ProfessionsInput
  }
}
</script>

<style scoped>

</style>