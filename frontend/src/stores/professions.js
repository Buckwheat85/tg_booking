import {defineStore} from "pinia"
import axios from "axios"

export const useProfessionStore = defineStore('profession', {
    state: () => ({
        professions: [],
    }),
    getters: {
        getProfessions(state) {
            return state.professions
        },
    },
    actions: {
        async fetchProfessions() {
            try {
                const response = await axios.get("http://127.0.0.1:3001/api/professions")
                this.professions = response.data
            } catch (error) {
                console.log(error)
            }
        },
        addProfession(profName) {
            axios.post("http://127.0.0.1:3001/api/professions", {
                profName: profName,
            }).then((res) => {
                this.fetchProfessions()
            }).catch(() => {
                console.log('ошибка добавления профессии')
            })
        },
        removeProfession(profId) {
            axios.delete("http://127.0.0.1:3001/api/professions", {
                data: {profId}
            }).then((res) => {
                this.fetchProfessions()
            }).catch(() => {
                console.log('ошибка удаления профессии')
            })
        },
    }
})

