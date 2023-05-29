import {defineStore} from "pinia"
import axios from "axios"
import getFullApiPath from "@/modules/api-config"

const professionsApiPath = getFullApiPath("api/professions")

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
                const response = await axios.get(professionsApiPath)
                this.professions = response.data
            } catch (err) {
                console.log(err)
            }
        },
        addProfession(profName) {
            axios.post(professionsApiPath, {
                profName: profName,
            }).then((res) => {
                this.fetchProfessions()
            }).catch((err) => {
                console.error(err)
            })
        },
        removeProfession(profId) {
            axios.delete(professionsApiPath, {
                data: {profId}
            }).then((res) => {
                this.fetchProfessions()
            }).catch((err) => {
                console.error(err)
            })
        },
    }
})

