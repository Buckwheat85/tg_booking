import {defineStore} from "pinia"
import axios from "axios"
import {formatDateLikeISO} from "@/modules/date_operations.js"


export const useTimetableStore = defineStore('timetable', {
    state: () => ({
        timetable: [],
        splitDays: [],
    }),
    getters: {
        getTimetable(state) {
            return state.timetable
        },
        getSplitDays(state) {
            return state.splitDays
        }
    },
    actions: {
        fetchTimetable() {
            axios.get("http://127.0.0.1:3001/api/employee/timetable").then((res) => {
                this.timetable = res.data
            }).catch((err) => {
                console.error(err)
            })
        },
        fetchSplitDays(selectedDate) {
            axios.get("http://127.0.0.1:3001/api/splits", {
                params: {
                    selected_date: formatDateLikeISO(selectedDate)
                }
            }).then((res) => {
                this.splitDays = res.data
            }).catch((err) => {
                console.error(err)
            })
        },
        addTimetable(timetable) {
            axios.post("http://127.0.0.1:3001/api/employee/timetable", {
                data: timetable,
            }).then((res) => {
                this.fetchTimetable()
            }).catch((err) => {
                console.error(err)
            })
        },
        deleteTimetable(timetableToClearDays) {
            axios.delete("http://127.0.0.1:3001/api/employee/timetable", {
                data: timetableToClearDays
            }).then(() => {
                this.fetchTimetable()
            }).catch((err) => {
                console.error(err)
            })
        }
    }
})