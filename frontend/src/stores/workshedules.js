import {defineStore} from "pinia"
import axios from "axios"
import { formatDateTimeForSQLQuery } from "@/modules/date_operations.js"
import getFullApiPath from "@/modules/api-config"

const bookingApiPath = getFullApiPath("api/booking")

export const useWorkShedulesStore = defineStore('workshedules', {
    state: () => ({
        events: [],
    }),
    getters: {
        getEvents(state) {
            return state.events
        },
    },
    actions: {
        fetchWorkShedules(timeFrom, timeTo) {
            const timeFromUTC = formatDateTimeForSQLQuery(timeFrom)
            const timeToUTC = formatDateTimeForSQLQuery(timeTo)

            axios.get(bookingApiPath, {
                params: {
                    time_from: timeFromUTC,
                    time_to: timeToUTC
                }
            }).then((res) => {
                if (typeof res.data === 'string') {
                    this.events = JSON.parse(res.data)
                } else {
                    this.events = res.data
                }
            }).catch((err) => {
                console.error(err)
            })
        },
        async addBooking(data) {
            await axios.post(bookingApiPath, {
                data: data,
            }).then((res) => {
                // this.fetchWorkShedules()
            }).catch((err) => {
                console.error(err)
            })
        },
        async deleteBooking(eventId) {
            const path = bookingApiPath + `/${eventId}`
            await axios.delete(path).catch((err)=>{
                console.error(err)
            })
        },
        async editBooking(data) {
            await axios.put(bookingApiPath, data).catch((err)=>{
                console.error(err)
            })
        }
    }
})