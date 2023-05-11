import {defineStore} from "pinia"
import axios from "axios"

export const useServiceStore = defineStore('service', {
    state: () => ({
        services: [],
    }),
    getters: {
        getServices(state) {
            return state.services
        },
        getServicesByProfession: (state) => {
            return (profId)=> {
                return state.services.filter((el) => {
                    return el.professionId == profId
                })
            }
        }
    },
    actions: {
        async fetchServices() {
            try {
                const response = await axios.get("http://127.0.0.1:3001/api/services")
                this.services = response.data
            } catch (err) {
                console.error(err)
            }
        },
        addService(serviceName, professionId) {
            axios.post("http://127.0.0.1:3001/api/services", {
                serviceName,
                professionId
            }).then((res) => {
                this.fetchServices()
            }).catch((err) => {
                console.log(err)
            })
        },
        removeService(serviceId) {
            axios.delete("http://127.0.0.1:3001/api/services",{
                data: {serviceId}
            }).then((res) => {
                this.fetchServices()
            }).catch((err) => {
                console.log(err)
            })
        },
    }
})

