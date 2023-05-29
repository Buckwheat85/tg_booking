import {defineStore} from "pinia"
import axios from "axios"
import getFullApiPath from "@/modules/api-config"

const servicesApiPath = getFullApiPath("api/services")

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
                const response = await axios.get(servicesApiPath)
                this.services = response.data
            } catch (err) {
                console.error(err)
            }
        },
        addService(serviceName, professionId) {
            axios.post(servicesApiPath, {
                serviceName,
                professionId
            }).then((res) => {
                this.fetchServices()
            }).catch((err) => {
                console.error(err)
            })
        },
        removeService(serviceId) {
            axios.delete(servicesApiPath,{
                data: {serviceId}
            }).then((res) => {
                this.fetchServices()
            }).catch((err) => {
                console.error(err)
            })
        },
    }
})

