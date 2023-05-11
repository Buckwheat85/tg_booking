import {defineStore} from "pinia"
import axios from "axios"
import { formatDateTimeForSQLQuery } from "@/modules/date_operations.js"


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

            axios.get(`http://127.0.0.1:3001/api/booking`, {
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
            await axios.post("http://127.0.0.1:3001/api/booking", {
                data: data,
            }).then((res) => {
                // this.fetchWorkShedules()
            }).catch(() => {
                console.error('ошибка бронирования')
            })
        },
        async deleteBooking(eventId) {
            const path = `http://127.0.0.1:3001/api/booking/${eventId}`
            await axios.delete(path).catch((err)=>{
                console.error(err)
            })
        },
        async editBooking(data) {
            const path = `http://127.0.0.1:3001/api/booking`
            await axios.put(path, data).catch((err)=>{
                console.error(err)
            })
        }
    }
})