import {defineStore} from "pinia"
import axios from "axios"

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
                const response = await axios.get("http://127.0.0.1:3001/api/clients")
                this.clients = response.data
            } catch (err) {
                console.error(err)
            }
        },
        async addClient(clientName) {
            await axios.post("http://127.0.0.1:3001/api/clients", {
                data: clientName
            }).then((res) => {
                this.fetchClients()
            }).catch((err) => {
                console.log(err)
            })
        },
        deleteClient(id) {
            axios.delete("http://127.0.0.1:3001/api/clients", {
                data: {id: id}
            }).then((res) => {
                this.fetchClients()
            }).catch((err) => {
                console.log(err)
            })
        }
    }
})