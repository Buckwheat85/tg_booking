<template>

<!--  <form>-->
<!--    <div class="mb-3">-->
<!--      <label class="form-label">Должность</label>-->
<!--      <input type="text" class="form-control" v-model="profName">-->
<!--    </div>-->
<!--    <button class="btn btn-primary" @click.prevent="addProfession">Добавить</button>-->
<!--  </form>-->

  <table class="table">
    <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Профессия</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="prof in professions">
      <th scope="row">{{ prof.id }}</th>
      <td>{{ prof.name }}</td>
      <td>
        <div class="btn btn-danger" @click="deleteProfession(prof.id)">Удалить</div>
      </td>
    </tr>
    </tbody>
  </table>

</template>

<script>
import axios from "axios";
import {useProfessionStore} from "@/stores/professions";

export default {
  name: "ProfessionsList",
  data() {
    return {
      profName: '',
      professions: []
    }
  },
  mounted() {
    this.getProfessions()
  },
  methods: {
    async getProfessions: function () {
      await axios.get("/api/profession").then((res) => {
        this.professions = res.data.data
      }).catch(() => {
        console.log('ошибка загрузки профессий с сервера')
      })

      const professionStore = useProfessionStore()
      console.log(professionStore.getProfessions())

    },
    addProfession: function () {
      axios.post("/api/profession", {
        profName: this.profName,
      }).then((res) => {
        this.profName = ""
        this.getProfessions()
      }).catch(() => {
        console.log('ошибка добавления профессии')
      })
    },
    deleteProfession: function (profID) {
      axios.post("/api/profession/delete", {
        profID
      }).then((res) => {
        this.getProfessions()
      }).catch(() => {
        console.log('ошибка удаления профессии')
      })
    },
  },
}
</script>

<style scoped>

</style>