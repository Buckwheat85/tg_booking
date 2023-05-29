import {defineStore} from "pinia"
import axios from "axios"
import getFullApiPath from "@/modules/api-config"

const clientsApiPath = getFullApiPath("api/clients")

export const useClientStore = defineStore('client', {
    state: () => ({
        clients: [],
    }),
    getters: {
        getClients(state) {
            return state.clients
        },
    },
    actions: {
        async fetchClients() {
            try {
                const response = await axios.get(clientsApiPath)
                this.clients = response.data
            } catch (err) {
                console.error(err)
            }
        },
        async addClient(clientName) {
            await axios.post(clientsApiPath, {
                data: clientName
            }).then((res) => {
                this.fetchClients()
            }).catch((err) => {
                console.log(err)
            })
        },
        deleteClient(id) {
            axios.delete(clientsApiPath, {
                data: {id: id}
            }).then((res) => {
                this.fetchClients()
            }).catch((err) => {
                console.log(err)
            })
        }
    }
})